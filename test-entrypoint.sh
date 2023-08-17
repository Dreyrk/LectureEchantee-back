#bin/bash

echo "\n###\n# Launch API...\n###"
nohup npm start &
echo "\n###\n# Populate DB with seed...\n###"
npm run seed
echo "\n###\n# Launch Units Tests...\n###"
npm run mocha &
PID2=$!
wait $PID2