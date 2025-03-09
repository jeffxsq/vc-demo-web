const program = require('commander');
const { issueVC } = require('@terminal3/ecdsa_vc');
const { createBBSVC, selectiveDisclose } = require('@terminal3/bbs_vc');
const { verifyVC } = require('@terminal3/verify_vc');
const { castVC } = require('@terminal3/vc_cast');

// Sample credential data
const credentialData = {
  kycStatus: 'verified',
  dateOfBirth: '1990-05-15', // YYYY-MM-DD
  nationality: 'USA',
  languages: ['English', 'Spanish']
};

// Issuer function
async function issueCredential() {
  const vc = await issueVC(credentialData, { issuer: 'did:example:issuer' });
  console.log('Issued VC:', JSON.stringify(vc, null, 2));
  return vc;
}

// Selective disclosure function
async function discloseCredential(vc, options = {}) {
  const bbsVC = await createBBSVC(vc); // Convert to BBS for selective disclosure
  let disclosed;

  if (options.all) {
    disclosed = bbsVC; // Full disclosure
  } else if (options.fields) {
    disclosed = await selectiveDisclose(bbsVC, options.fields); // e.g., ['kycStatus']
  } else if (options.predicate === 'over18') {
    const dob = new Date(credentialData.dateOfBirth);
    const age = (new Date() - dob) / (1000 * 60 * 60 * 24 * 365.25);
    disclosed = await selectiveDisclose(bbsVC, [], { over18: age > 18 });
  }

  console.log('Disclosed VC:', JSON.stringify(disclosed, null, 2));
  return disclosed;
}

// CLI Commands
program
  .command('issue')
  .description('Issue a new verifiable credential')
  .action(async () => {
    const vc = await issueCredential();
    process.exit(0);
  });

program
  .command('disclose')
  .option('--all', 'Disclose all fields')
  .option('--fields <fields>', 'Disclose specific fields (comma-separated)', val => val.split(','))
  .option('--over18', 'Prove age over 18 without revealing date of birth')
  .description('Selectively disclose credential fields')
  .action(async (options) => {
    const vc = await issueCredential(); // Simulate issued VC
    await discloseCredential(vc, options);
    process.exit(0);
  });

program.parse(process.argv);