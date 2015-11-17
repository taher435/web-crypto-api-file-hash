# Web Cryptography API - Hashing an uploaded file

Using WebCrypto API inbuild in Google chrome it hashes an uploaded file.

We use FileHandle API to access the uploaded file and then using crypto object in chrome we will generate the hash.

Use Case : It can be used to check if file already exists on server by just sending the hash instead of entire file to the server which results in saving bandwidth and also time.

Demo : [https://jsbin.com](https://jsbin.com/sebada/1/edit?js,output)
