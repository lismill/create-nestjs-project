#!/bin/bash

echo ""
read -p "✨ - Please enter module name: " name
echo "✨ - module name: $name"
echo "✨ - ↓ Please waiting..."
echo ""
nest g resource modules/$name --no-spec
echo ""
echo "😊 - √ Done"
echo ""
