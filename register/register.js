// ── Helpers ──────────────────────────────────────────
function val(id)   { return document.getElementById(id).value.trim(); }
function showErr(id, msg) {
  document.getElementById('err-' + id).textContent = msg;
  document.getElementById(id).classList.add('error');
}
function clearErr(id) {
  document.getElementById('err-' + id).textContent = '';
  document.getElementById(id).classList.remove('error');
}
function setStep(n) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('formStep' + n).classList.add('active');
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-ind-' + n).classList.add('active');
  window.scrollTo({ top: 300, behavior: 'smooth' });
}

// ── Step 1 Validation ─────────────────────────────────
function goToStep2() {
  let valid = true;
  const fields1 = ['fullName','dob','gender','aadhaar','mobile','address','state','district'];
  fields1.forEach(f => clearErr(f));

  if (!val('fullName'))                          { showErr('fullName','Full name is required.');        valid=false; }
  if (!val('dob'))                               { showErr('dob','Date of birth is required.');         valid=false; }
  if (!val('gender'))                            { showErr('gender','Please select gender.');           valid=false; }
  if (!/^\d{12}$/.test(val('aadhaar')))          { showErr('aadhaar','Enter valid 12-digit Aadhaar.'); valid=false; }
  if (!/^\d{10}$/.test(val('mobile')))           { showErr('mobile','Enter valid 10-digit mobile.');   valid=false; }
  if (val('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email')))
                                                 { showErr('email','Enter a valid email address.');    valid=false; }
  if (!val('address'))                           { showErr('address','Address is required.');          valid=false; }
  if (!val('state'))                             { showErr('state','Please select your state.');       valid=false; }
  if (!val('district'))                          { showErr('district','District is required.');        valid=false; }

  if (valid) setStep(2);
}

// ── Step 2 Validation ─────────────────────────────────
function goToStep3() {
  let valid = true;
  const fields2 = ['landArea','landOwn','cropType','irrigation','farmingType','income'];
  fields2.forEach(f => clearErr(f));

  if (!val('landArea') || parseFloat(val('landArea')) <= 0)
                        { showErr('landArea','Enter valid land area.'); valid=false; }
  if (!val('landOwn'))  { showErr('landOwn','Select land ownership.');  valid=false; }
  if (!val('cropType')) { showErr('cropType','Select primary crop.');   valid=false; }
  if (!val('irrigation')){ showErr('irrigation','Select irrigation source.'); valid=false; }
  if (!val('farmingType')){ showErr('farmingType','Select farming type.'); valid=false; }
  if (!val('income'))   { showErr('income','Select annual income range.'); valid=false; }

  if (valid) {
    buildReview();
    setStep(3);
  }
}

function goToStep1() { setStep(1); }
function goToStep2Back() { setStep(2); }

// ── Build Review Box ──────────────────────────────────
function buildReview() {
  const schemes = [...document.querySelectorAll('.checkbox-group input:checked')]
                    .map(c => c.value).join(', ') || 'None selected';

  document.getElementById('reviewBox').innerHTML = `
    <table style="width:100%;border-collapse:collapse;">
      <tr><td colspan="2" style="padding:6px 0;font-weight:700;color:#1b5e20;font-size:1rem;">
        👤 Personal Information</td></tr>
      <tr><td style="width:45%;padding:4px 0;"><strong>Full Name:</strong></td>
          <td>${val('fullName')}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>${val('dob')}</td></tr>
      <tr><td><strong>Gender:</strong></td><td>${val('gender')}</td></tr>
      <tr><td><strong>Aadhaar Number:</strong></td>
          <td>XXXX-XXXX-${val('aadhaar').slice(-4)}</td></tr>
      <tr><td><strong>Mobile:</strong></td><td>${val('mobile')}</td></tr>
      <tr><td><strong>Email:</strong></td>
          <td>${val('email') || 'Not provided'}</td></tr>
      <tr><td><strong>Address:</strong></td><td>${val('address')}</td></tr>
      <tr><td><strong>State:</strong></td><td>${val('state')}</td></tr>
      <tr><td><strong>District:</strong></td><td>${val('district')}</td></tr>

      <tr><td colspan="2" style="padding:14px 0 6px;font-weight:700;color:#1b5e20;font-size:1rem;">
        🚜 Farm Details</td></tr>
      <tr><td><strong>Land Area:</strong></td><td>${val('landArea')} Acres</td></tr>
      <tr><td><strong>Land Ownership:</strong></td><td>${val('landOwn')}</td></tr>
      <tr><td><strong>Primary Crop:</strong></td><td>${val('cropType')}</td></tr>
      <tr><td><strong>Irrigation:</strong></td><td>${val('irrigation')}</td></tr>
      <tr><td><strong>Farming Type:</strong></td><td>${val('farmingType')}</td></tr>
      <tr><td><strong>Annual Income:</strong></td><td>${val('income')}</td></tr>
      <tr><td><strong>Schemes Interested:</strong></td><td>${schemes}</td></tr>
    </table>
  `;
}

// ── Final Submit ──────────────────────────────────────
function submitForm() {
  clearErr('declaration');
  if (!document.getElementById('declaration').checked) {
    document.getElementById('err-declaration').textContent =
      'Please accept the declaration to proceed.';
    return;
  }
  const refId = 'KSP-' + Date.now().toString().slice(-8);
  document.getElementById('refId').textContent = refId;
  document.getElementById('successPopup').classList.add('show');
}

function closePopup() {
  document.getElementById('successPopup').classList.remove('show');
  window.location.href = 'index.html';
}
