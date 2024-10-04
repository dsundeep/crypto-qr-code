import CryptoQRCodeGenerator from '../src/index';
import QRCode from 'qrcode';

jest.mock('qrcode', () => ({
    toString: jest.fn(),
    toDataURL: jest.fn(),
}));

describe('CryptoQRCodeGenerator', () => {
    let cryptoQRCodeGenerator: CryptoQRCodeGenerator;

    beforeAll(() => {
        cryptoQRCodeGenerator = new CryptoQRCodeGenerator();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('should generate a valid Bitcoin QR code', async () => {
        const bitcoinAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        const mockPngQRCode = 'data:image/png;base64,...';
        (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockPngQRCode);
        const qrCodeImage = await cryptoQRCodeGenerator.generateQRCode(bitcoinAddress, { currency: 'BTC' });
        
        expect(QRCode.toDataURL).toHaveBeenCalledWith(`bitcoin:${bitcoinAddress}`, { errorCorrectionLevel: 'H', type: 'image/png' });
        expect(qrCodeImage).toMatch(/^data:image\/png;base64,/);
    });

    test('should generate a valid Ethereum QR code', async () => {
        const ethereumAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
        const mockPngQRCode = 'data:image/png;base64,...';
        (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockPngQRCode);
        const qrCodeImage = await cryptoQRCodeGenerator.generateQRCode(ethereumAddress, { currency: 'ETH' });
        
        expect(QRCode.toDataURL).toHaveBeenCalledWith(`ethereum:${ethereumAddress}`, { errorCorrectionLevel: 'H', type: 'image/png' });
        expect(qrCodeImage).toMatch(/^data:image\/png;base64,/);
    });

    test('should generate a valid Ethereum QR code in jpeg format', async () => {
        const ethereumAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
        const mockJpegQRCode = 'data:image/jpeg;base64,...';
        (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockJpegQRCode);
        const qrCodeImage = await cryptoQRCodeGenerator.generateQRCode(ethereumAddress, { currency: 'ETH', format: 'image/jpeg' });

        expect(QRCode.toDataURL).toHaveBeenCalledWith(`ethereum:${ethereumAddress}`, { errorCorrectionLevel: 'H', type: 'image/jpeg' });
        expect(qrCodeImage).toMatch(/^data:image\/jpeg;base64,/);
    });

    test('should generate a valid Bitcoin QR code in svg format', async () => {
        const bitcoinAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        const mockSvgQRCode = '<svg>...</svg>';
        (QRCode.toString as jest.Mock).mockResolvedValue(mockSvgQRCode);
        const qrCodeImage = await cryptoQRCodeGenerator.generateQRCode(bitcoinAddress, { currency: 'BTC', format: 'image/svg+xml' });

        expect(QRCode.toString).toHaveBeenCalledWith(`bitcoin:${bitcoinAddress}`, { errorCorrectionLevel: 'H', type: 'svg' });
        expect(qrCodeImage).toMatch(/^<svg>/);
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

    test('should throw an error for invalid btc address', async () => {
        const unsupportedAddress = 'testaddress';
        await expect(cryptoQRCodeGenerator.generateQRCode(unsupportedAddress, { currency: 'BTC' }))
            .rejects
            .toThrow('Invalid wallet address');
    });

    test('should throw an error for invalid eth address', async () => {
        const unsupportedAddress = 'testaddress';
        await expect(cryptoQRCodeGenerator.generateQRCode(unsupportedAddress    , { currency: 'ETH' }))
            .rejects
            .toThrow('Invalid wallet address');
    });

    test('should throw an error if QR code generation fails', async () => {
        const bitcoinAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        (QRCode.toDataURL as jest.Mock).mockRejectedValue(new Error('Generation error')); // Mock failure

        await expect(cryptoQRCodeGenerator.generateQRCode(bitcoinAddress, { currency: 'BTC' }))
            .rejects
            .toThrow('Failed to generate QR code: Generation error');
    });

    test('should generate qrcode for bitcoin by default', async () => {
        const bitcoinAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        const mockPngQRCode = 'data:image/png;base64,...';
        (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockPngQRCode);
        const qrCodeImage = await cryptoQRCodeGenerator.generateQRCode(bitcoinAddress);
        
        expect(QRCode.toDataURL).toHaveBeenCalledWith(`bitcoin:${bitcoinAddress}`, { errorCorrectionLevel: 'H', type: 'image/png' });
        expect(qrCodeImage).toMatch(/^data:image\/png;base64,/);
    });
});
