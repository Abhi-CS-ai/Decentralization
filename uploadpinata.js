const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');

// Use the `new` keyword here
const pinata = new pinataSDK('aa211094ea07f7a15529', '27404d69d6848740cd19cc6560bb0287be3a403e75e9638844370278f2fda0a4');

const uploadToPinata = async () => {
    const directory = 'C:/Users/DELL/Desktop/Decentralization/TD2'; // Your folder path
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const readableStream = fs.createReadStream(path.join(directory, file));
        const options = {
            pinataMetadata: {
                name: file,
            },
            pinataOptions: {
                cidVersion: 1,
            },
        };

        try {
            const result = await pinata.pinFileToIPFS(readableStream, options);
            console.log(`${file} pinned to IPFS:`, result);
        } catch (error) {
            console.error(`Error uploading ${file}:`, error);
        }
    }
};

uploadToPinata();
