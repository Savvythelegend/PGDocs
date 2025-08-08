import os
import shutil

SOURCE_DIR = "docs"  # Or wherever your markdowns live
DEST_DIR = "versioned_docs/version-3"

def convert_md_to_mdx(src, dest):
    os.makedirs(dest, exist_ok=True)

    for root, _, files in os.walk(src):
        for file in files:
            if file.endswith(".md"):
                rel_path = os.path.relpath(root, src)
                target_dir = os.path.join(dest, rel_path)
                os.makedirs(target_dir, exist_ok=True)

                src_file = os.path.join(root, file)
                dest_file = os.path.join(target_dir, file.replace(".md", ".mdx"))

                # Optional: Read and modify content if needed
                with open(src_file, "r", encoding="utf-8") as f:
                    content = f.read()

                # Write as .mdx
                with open(dest_file, "w", encoding="utf-8") as f:
                    f.write(content)

                print(f"✅ Converted: {src_file} -> {dest_file}")

convert_md_to_mdx(SOURCE_DIR, DEST_DIR)