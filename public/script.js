let currentVC = null;
let currentVP = null;

async function issueVC() {
  const response = await fetch('/issue');
  const data = await response.json();
  currentVC = data.vc;
  currentVP = null;
  document.getElementById('output').textContent = 
    'Issued Verifiable Credential:\n' + JSON.stringify(data.vc, null, 2);
}

async function discloseVC() {
  if (!currentVC) {
    alert('Please issue a VC first!');
    return;
  }

  const disclosureType = document.querySelector('input[name="disclosure"]:checked').value;
  let options = { type: disclosureType };

  if (disclosureType === 'selected') {
    const selectedFields = Array.from(document.querySelectorAll('input[name="fields"]:checked'))
      .map(input => input.value);
    if (selectedFields.length === 0) {
      alert('Please select at least one field!');
      return;
    }
    options.fields = selectedFields;
  } else if (disclosureType === 'predicate') {
    options.predicate = 'over18';
  }

  const response = await fetch('/disclose', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vc: currentVC, options })
  });
  const data = await response.json();
  currentVP = data.vp;
  document.getElementById('output').textContent = 
    'Disclosed Verifiable Presentation:\n' + JSON.stringify(data.vp, null, 2);
}

async function verify() {
  if (!currentVC) {
    alert('Please issue a VC first!');
    return;
  }
  if (!currentVP) {
    alert('Please disclose a VC first!');
    return;
  }

  const response = await fetch('/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vc: currentVC, vp: currentVP })
  });
  const data = await response.json();
  document.getElementById('output').textContent = 
    'Verification Results:\n' +
    'VC: ' + JSON.stringify(data.vcResult, null, 2) + '\n\n' +
    'VP: ' + JSON.stringify(data.vpResult, null, 2);
}

// Toggle field selection visibility
document.querySelectorAll('input[name="disclosure"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const fieldSelection = document.getElementById('field-selection');
    fieldSelection.classList.toggle('hidden', radio.value !== 'selected');
  });
});