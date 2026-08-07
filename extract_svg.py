import json
import os
import re

log_path = r"C:\Users\Administrator\.gemini\antigravity-ide\brain\1f88243b-4365-47f8-ad77-7accf93e0888\.system_generated\logs\transcript.jsonl"

def main():
    if not os.path.exists(log_path):
        print("Log file does not exist!")
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            try:
                data = json.loads(line)
                source = data.get("source")
                step_type = data.get("type")
                if step_type == "USER_INPUT":
                    content = data.get("content", "")
                    print(f"Index {idx}: length={len(content)}, start={content[:100]}")
                    if "<svg" in content or "xml" in content:
                        print("FOUND SVG IN CONTENT AT INDEX", idx)
                        # Extract it
                        match = re.search(r"(<svg.*?</svg>)", content, re.DOTALL | re.IGNORECASE)
                        if match:
                            svg = match.group(1)
                            target_dir = r"c:\Users\Administrator\Desktop\shell-ai-os-controller-website-main\shell-ai-os-controller-website-main\public\media\diagrams"
                            os.makedirs(target_dir, exist_ok=True)
                            target_file = os.path.join(target_dir, "routing-flow.svg")
                            with open(target_file, 'w', encoding='utf-8') as out_f:
                                out_f.write(svg)
                            print("Saved to", target_file)
                            return
            except Exception as e:
                print(f"Error parsing index {idx}: {e}")

if __name__ == "__main__":
    main()
