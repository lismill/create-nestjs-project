#!/bin/bash

echo ""
read -p "✨ - Please enter module name: " name
echo "✨ - module name: $name"
echo "✨ - ↓ Please waiting..."

nest g mo $name modules
nest g co $name modules
nest g s $name modules
echo "😊 - √ Done"
echo ""
