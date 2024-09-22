// CryptoQRCodeGenerator.ts
import QRCode from 'qrcode';
import { QRCodeOptions } from './QRCodeOptions';

class CryptoQRCodeGenerator {
    constructor() {}

    async generateQRCode(address: string | undefined, options: QRCodeOptions = {}): Promise<string> {
        if (!address) {
            throw new Error('Wallet address is required.');
        }

        // initialize with default values
        const {
            currency = 'BTC',
            format = 'image/png',
        } = options;

        // Construct the data to encode based on currency
        let data: string;
        if (currency.toLowerCase() === 'btc') {
            data = `bitcoin:${address}`;
        } else if (currency.toLowerCase() === 'eth') {
            data = `ethereum:${address}`;
        } else {
            throw new Error('Unsupported currency. Please use "BTC" or "ETH".');
        }

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
}

export default CryptoQRCodeGenerator;
