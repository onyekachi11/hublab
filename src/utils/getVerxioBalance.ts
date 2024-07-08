import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey
} from '@solana/web3.js';
import {
    TOKEN_2022_PROGRAM_ID,
    getOrCreateAssociatedTokenAccount,
} from '@solana/spl-token';
import bs58 from 'bs58';

const getBalance = async (destinationAddress: string) => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const secretKey = bs58.decode("4xRBSuyXwbKK7jwF1hV156L1AzH4h6n2sKsYhABTpKwdaKDqCg785XFreUmGtDfRG53SnRw9KtcFnf22doSTFqRt");
        const payer = Keypair.fromSecretKey(secretKey);

        const mint = new PublicKey("DHTpJsn6DTreym4cydGQgcYUkGEBG1kJJKg64PgpgHEN");
        const destinationAccount = new PublicKey(destinationAddress);

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            destinationAccount,
            undefined,
            undefined,
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        const balance = Number(tokenAccount.amount) / LAMPORTS_PER_SOL;
        return balance;
    } catch (error) {
        console.error("Error getting balance:", error);
        return null;
    }
};

export default getBalance;
