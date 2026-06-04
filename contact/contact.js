function val(id) { return document.getElementById(id).value.trim(); }

function showErr(id, msg) {
  document.getElementById('err-' + id).textContent = msg;
  document.getElementById(id).classList.add('error');
}

function clearErr(id) {
  document.getElementById('err-' + id).textContent = '';
  document.getElementById(id).classList.remove('error');
}

function submitContact() {
  const fields = ['cName', 'cMobile', 'cEmail', 'cSubject', 'cMessage'];
  fields.forEach(f => clearErr(f));
  let valid = true;

  if (!val('cName'))
    { showErr('cName', 'Name is required.'); valid = false; }

  if (!/^\d{10}$/.test(val('cMobile')))
    { showErr('cMobile', 'Enter a valid 10-digit mobile number.'); valid = false; }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('cEmail')))
    { showErr('cEmail', 'Enter a valid email address.'); valid = false; }

  if (!val('cSubject'))
    { showErr('cSubject', 'Please select a subject.'); valid = false; }

  if (val('cMessage').length < 10)
    { showErr('cMessage', 'Message must be at least 10 characters.'); valid = false; }

  if (valid) {
    document.getElementById('contactSuccess').style.display = 'block';
    fields.forEach(f => {
      const el = document.getElementById(f);
      el.value = '';
    });
    setTimeout(() => {
      document.getElementById('contactSuccess').style.display = 'none';
    }, 5000);
  }
}
