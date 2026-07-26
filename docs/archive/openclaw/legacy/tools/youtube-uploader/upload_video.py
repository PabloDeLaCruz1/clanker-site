#!/usr/bin/env python3
"""
Minimal YouTube uploader for personal/internal use.

One-time setup:
1) Create OAuth client credentials in Google Cloud Console (Desktop app)
2) Save JSON as ./client_secret.json
3) Run once with --auth-only to complete browser consent

Then upload with:
python upload_video.py --file /path/video.mov --title "My Title" --description "..." --privacy private
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Upload a video to YouTube")
    p.add_argument("--file", help="Path to local video file")
    p.add_argument("--title", default="Untitled upload")
    p.add_argument("--description", default="")
    p.add_argument("--tags", nargs="*", default=[])
    p.add_argument("--category", default="22", help="YouTube category id (22=People & Blogs)")
    p.add_argument("--privacy", choices=["private", "unlisted", "public"], default="private")
    p.add_argument("--made-for-kids", action="store_true")
    p.add_argument("--auth-only", action="store_true", help="Only perform OAuth flow and save token")
    p.add_argument("--credentials", default="client_secret.json", help="OAuth client credentials json")
    p.add_argument("--token", default="token.json", help="OAuth token json")
    return p.parse_args()


def get_credentials(credentials_path: Path, token_path: Path) -> Credentials:
    creds = None
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(str(credentials_path), SCOPES)
            creds = flow.run_local_server(port=0)

        token_path.write_text(creds.to_json())

    return creds


def upload_video(youtube, args: argparse.Namespace) -> dict:
    body = {
        "snippet": {
            "title": args.title,
            "description": args.description,
            "tags": args.tags,
            "categoryId": args.category,
        },
        "status": {
            "privacyStatus": args.privacy,
            "selfDeclaredMadeForKids": bool(args.made_for_kids),
        },
    }

    media = MediaFileUpload(args.file, chunksize=-1, resumable=True)
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

    response = None
    while response is None:
        _, response = request.next_chunk()

    return response


def main() -> int:
    args = parse_args()
    cwd = Path.cwd()
    credentials_path = (cwd / args.credentials).resolve()
    token_path = (cwd / args.token).resolve()

    if not credentials_path.exists():
        print(f"Missing credentials file: {credentials_path}")
        print("Create OAuth Desktop credentials in Google Cloud Console and save as client_secret.json")
        return 1

    if not args.auth_only:
        if not args.file:
            print("--file is required unless --auth-only is used")
            return 1
        if not Path(args.file).exists():
            print(f"Video file not found: {args.file}")
            return 1

    try:
        creds = get_credentials(credentials_path, token_path)
        youtube = build("youtube", "v3", credentials=creds)

        if args.auth_only:
            print(f"Auth complete. Token saved to: {token_path}")
            return 0

        result = upload_video(youtube, args)
        out = {
            "videoId": result.get("id"),
            "title": result.get("snippet", {}).get("title", args.title),
            "url": f"https://youtu.be/{result.get('id')}",
            "privacy": args.privacy,
        }
        print(json.dumps(out, indent=2))
        return 0

    except HttpError as e:
        print(f"YouTube API error: {e}")
        return 2
    except Exception as e:
        print(f"Unexpected error: {e}")
        return 3


if __name__ == "__main__":
    sys.exit(main())
