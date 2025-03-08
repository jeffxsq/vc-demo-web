const { issueVC } = require('@terminal3/ecdsa_vc');
const { createCredential } = require('@terminal3/vc_core');

async function issueCredential() {
  const credentialData = {
    id: 'did:example:123',
    kycStatus: 'verified',
    dateOfBirth: '1990-01-01',
    nationality: 'USA',
    languages: ['English', 'Spanish']
  };

  const issuerDid = 'did:example:issuer456';
  const privateKey = 'your-private-key-here'; // Replace with actual key

  try {
    const vc = await createCredential(credentialData, issuerDid);
    const signedVC = await issueVC(vc, privateKey);
    return signedVC;
  } catch (error) {
    throw new Error('Error issuing VC: ' + error.message);
  }
}

module.exports = { issueCredential };