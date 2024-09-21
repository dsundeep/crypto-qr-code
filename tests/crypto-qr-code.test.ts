import CryptoQRCodeGenerator from '../src/index';

describe('CryptoQRCodeGenerator', () => {
    let cryptoQRCodeGenerator: CryptoQRCodeGenerator;

    beforeAll(() => {
        cryptoQRCodeGenerator = new CryptoQRCodeGenerator();
    });

    test('should generate a valid Bitcoin QR code', async () => {
        const bitcoinAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        const qrCodeImage = await cryptoQRCodeGenerator.generateQRCode(bitcoinAddress, { currency: 'BTC' });
        
        expect(qrCodeImage).toMatch(/^data:image\/png;base64,/);
    });

    test('should generate a valid Ethereum QR code', async () => {
        const ethereumAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
        const qrCodeImage = await cryptoQRCodeGenerator.generateQRCode(ethereumAddress, { currency: 'ETH' });
        
        expect(qrCodeImage).toMatch(/^data:image\/png;base64,/);
    });

    test('should throw an error for unsupported currency', async () => {
        const unsupportedAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        
        await expect(cryptoQRCodeGenerator.generateQRCode(unsupportedAddress, { currency: 'LTC' as any })) // Use 'as any'
            .rejects
            .toThrow('Unsupported currency. Please use "BTC" or "ETH".');
    });

    test('should throw an error for missing address', async () => {
        await expect(cryptoQRCodeGenerator.generateQRCode(undefined as any, { currency: 'BTC' }))
            .rejects
            .toThrow('Wallet address is required.');
    });
    
});
