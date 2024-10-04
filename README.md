# crypto-qr-code

[![crypto-qr-code](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://www.npmjs.com/package/crypto-qr-code)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

**crypto-qr-code** is a library for generating QR codes for cryptocurrency wallet addresses, supporting Bitcoin (BTC) and Ethereum (ETH). It provides options for customizing the QR code's format and currency type.

## Installation

You can install **crypto-qr-code** via npm: [![npm install](https://img.shields.io/npm/dt/crypto-qr-code.svg)](https://www.npmjs.com/package/crypto-qr-code)

```bash
npm install crypto-qr-code
```

## Usage

Here's how to use the library:

```typescript
import crypto-qr-codeGenerator from 'crypto-qr-code';

const qrGenerator = new crypto-qr-codeGenerator();

async function generateQRCode() {
    try {
        const qrCodeImage = await qrGenerator.generateQRCode('your_wallet_address', { currency: 'BTC' });
        console.log(qrCodeImage); // Outputs the QR code as a base64-encoded image
    } catch (error) {
        console.error(error);
    }
}

generateQRCode();
```

## Options

The `generateQRCode` method accepts two parameters:

1. **address**: The wallet address for the cryptocurrency (required).
2. **options**: An object that can include:
   - **currency**: The type of cryptocurrency (default: `BTC`). Options are `BTC` for Bitcoin and `ETH` for Ethereum.
   - **format**: The desired image format for the QR code (default: `image/png`). Options are `image/png`, `image/jpeg`, and `image/svg+xml`.

## Error Scenarios
1. **Empty Wallet Address**: The wallet address is a required parameter.
2. **Invalid Currency**: At present, we support only BTC and ETH.
3. **Invalid Wallet Address**: If the provided address is not according to the standards, an error will be thrown.
4. **QR Code Generation Error**: If there is problem generating the QR code, an error will be thrown.

## Examples

- Here’s a full example of generating a QR code for a Bitcoin address:

```typescript
const qrCodeImage = await qrGenerator.generateQRCode('your_btc_wallet_address', { currency: 'BTC', format: 'image/png' });
console.log(qrCodeImage); // Base64 encoded PNG image
```

- Here’s a full example of generating a QR code for a Ethereum address:

```typescript
const qrCodeImageETH = await qrGenerator.generateQRCode('your_eth_wallet_address', { currency: 'ETH', format: 'image/jpeg' });
console.log(qrCodeImageETH); // Base64 encoded JPEG image
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
