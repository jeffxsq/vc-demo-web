const { createPresentation } = require('@terminal3/vc_core');
const { signBBS } = require('@terminal3/bbs_vc');

async function discloseCredential(vc, options = {}) {
  const holderDid = 'did:example:holder789';
  const privateKey = 'your-holder-private-key'; // Replace with actual key

  try {
    let vp;
    if (options.type === 'all') {
      // Display all fields
      vp = await createPresentation(vc, holderDid);
    } else if (options.type === 'selected' && options.fields) {
      // Display selected fields
      vp = await createPresentation(vc, holderDid, options.fields);
    } else if (options.type === 'predicate' && options.predicate) {
      // Predicate-based disclosure (e.g., over 18)
      const dob = new Date(vc.dateOfBirth);
      const today = new Date('2025-03-07'); // Current date as per system
      const age = today.getFullYear() - dob.getFullYear();
      const isOver18 = age >= 18;

      vp = await createPresentation(vc, holderDid, {
        predicate: {
          over18: isOver18
        }
      });
    } else {
      throw new Error('Invalid disclosure option');
    }

    const signedVP = await signBBS(vp, privateKey);
    return signedVP;
  } catch (error) {
    throw new Error('Error disclosing VC: ' + error.message);
  }
}

module.exports = { discloseCredential };