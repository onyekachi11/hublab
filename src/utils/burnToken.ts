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
    burn,
} from '@solana/spl-token';
import bs58 from 'bs58';

(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const secretKey = bs58.decode("4xRBSuyXwbKK7jwF1hV156L1AzH4h6n2sKsYhABTpKwdaKDqCg785XFreUmGtDfRG53SnRw9KtcFnf22doSTFqRt");
    const payer = Keypair.fromSecretKey(secretKey);
    
    const secretKey1 = bs58.decode("5GT8TtBWKqpLu11TszNBGudoJvxzyBgWGk7KGi2Bp7eMrxAk4bSn2UzY8NE4iKctRXnghV16XzWAn681qHhzvo4V");
    const owner = Keypair.fromSecretKey(secretKey1);

    const mint = new PublicKey("DHTpJsn6DTreym4cydGQgcYUkGEBG1kJJKg64PgpgHEN");
    const destinationAccount = new PublicKey("FFvPUNGYsQa4vjLAcCJ4zx8vZ4BSqQoCbMMyG3VNuEnd")

    const burnAmount = 200 * LAMPORTS_PER_SOL

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        destinationAccount,
        undefined,
        undefined, 
        undefined,
        TOKEN_2022_PROGRAM_ID
      )

    const balance =  Number(tokenAccount.amount) / LAMPORTS_PER_SOL

    const burnTxn = await burn(
      connection,
      payer, // Transaction fee payer
      tokenAccount.address, // Burn from
      mint, // Mint Account address
      owner, // Token Account owner
      burnAmount, 
      undefined, 
      undefined, 
      TOKEN_2022_PROGRAM_ID, 
    );
    
    console.log(
      "\nBurn Tokens:",
      `https://explorer.solana.com/tx/${burnTxn}?cluster=devnet`,
    );
    
})();