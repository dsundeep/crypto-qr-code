// CryptoQRCodeGenerator.ts
import QRCode from 'qrcode';
import { QRCodeOptions } from './QRCodeOptions';

class CryptoQRCodeGenerator {
    private addressPatterns: any = {
        bitcoin: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/, // Bitcoin address regex
        ethereum: /^0x[a-fA-F0-9]{40}$/ // Ethereum address regex
    };

    constructor() {}

    private validateAddress(address: string, pattern: RegExp) {
        return pattern.test(address);
    }

    private getBTC(address: string): string {
        const isValidAddress = this.validateAddress(address, this.addressPatterns.bitcoin);
        return (isValidAddress) ? `bitcoin:${address}` : "";
    }

    private getETH(address: string): string {
        const isValidAddress = this.validateAddress(address, this.addressPatterns.ethereum);
        return (isValidAddress) ? `ethereum:${address}` : "";
    }

    private async getQRCode(data: string, format: string): Promise<string> {
        try {
            let qrCodeImage: any;
            const qrOptions: any = { errorCorrectionLevel: 'H' };

            switch (format) {
                case 'image/svg+xml':
                    qrCodeImage = await QRCode.toString(data, { ...qrOptions, type: 'svg' });
                    break;
                case 'image/jpeg':
                    qrCodeImage = await QRCode.toDataURL(data, { ...qrOptions, type: 'image/jpeg' });
                    break;
                case 'image/png':
                default:
                    qrCodeImage = await QRCode.toDataURL(data, { ...qrOptions, type: 'image/png' });
            }
            return qrCodeImage;
        } catch (error: any) {
            throw new Error('Failed to generate QR code: ' + error.message);
        }
    }

    async generateQRCode(address: string | undefined, options: QRCodeOptions = {}): Promise<string> {
        if (!address) {
            throw new Error('Wallet address is required.');
        }

        // initialize with default values
        const {
            currency = 'BTC',
            format = 'image/png',
        } = options;
        let data: string;
        let qrCode: any;

        // Construct the data to encode based on currency
        if (currency.toLowerCase() === 'btc') {
            data = this.getBTC(address);
        } else if (currency.toLowerCase() === 'eth') {
            data = this.getETH(address)
        } else {
            throw new Error('Unsupported currency. Please use "BTC" or "ETH".');
        }

        // geneate QR Code if the address is valid.
        if (data) {
            qrCode = await this.getQRCode(data, format);
        } else {
            throw new Error('Invalid wallet address');
        }

        return qrCode;
    }
}

export default CryptoQRCodeGenerator;
