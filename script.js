const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const summaryInput = document.getElementById('summary');
const eduContainer = document.querySelector('#education-section .dynamic-input');
const expContainer = document.querySelector('#experience-section .dynamic-input');
const progress = document.getElementById('form-progress');

const updateResume = () => {
  document.getElementById('p-name').textContent = nameInput.value;
  document.getElementById('p-email').textContent = emailInput.value;
  document.getElementById('p-phone').textContent = phoneInput.value;
  document.getElementById('p-summary').textContent = summaryInput.value;

   // Handle Education (Degree + CGPA)
  const eduList = document.getElementById('p-education');
  eduList.innerHTML = '';
  const eduGroups = document.querySelectorAll('#education-section .edu-input-group');
  eduGroups.forEach(group => {
    const degree = group.querySelectorAll('input')[0]?.value || '';
    const cgpa = group.querySelectorAll('input')[1]?.value || '';
    if (degree || cgpa) {
      const li = document.createElement('li');
      li.textContent = `${degree} with ${cgpa}`;
      eduList.appendChild(li);
    }
  });
 // Handle Experience (Job + Company)
  const expList = document.getElementById('p-experience');
  expList.innerHTML = '';
  const expGroups = document.querySelectorAll('#experience-section .exp-input-group');
  expGroups.forEach(group => {
    const job = group.querySelectorAll('input')[0]?.value || '';
    const company = group.querySelectorAll('input')[1]?.value || '';
    if (job || company) {
      const li = document.createElement('li');
      li.textContent = `${job} at ${company}`;
      expList.appendChild(li);
    }
  });
  // Skills
  const selectedSkills = Array.from(document.querySelectorAll('.skills input:checked')).map(cb => cb.value);
  document.getElementById('p-skills').textContent = selectedSkills.join(', ');

  updateProgress();
};


document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', updateResume);
});
document.querySelectorAll('.skills input').forEach(cb => {
  cb.addEventListener('change', updateResume);
});

function addEducation() {
  const container = document.createElement('div');
  container.className = 'edu-input-group';

  const degreeInput = document.createElement('input');
  degreeInput.type = 'text';
  degreeInput.placeholder = 'Degree';
  degreeInput.className = 'edu-input';
  degreeInput.addEventListener('input', updateResume);

  const cgpaInput = document.createElement('input');
  cgpaInput.type = 'text';
  cgpaInput.placeholder = 'CGPA/Percentage';
  cgpaInput.className = 'edu-input';
  cgpaInput.addEventListener('input', updateResume);

  container.appendChild(degreeInput);
  container.appendChild(cgpaInput);

  document.querySelector('#education-section .dynamic-input').appendChild(container);
}


function addExperience() {
  const container = document.createElement('div');
  container.className = 'exp-input-group';

  const jobInput = document.createElement('input');
  jobInput.type = 'text';
  jobInput.placeholder = 'Job Title';
  jobInput.className = 'exp-input';
  jobInput.addEventListener('input', updateResume);

  const companyInput = document.createElement('input');
  companyInput.type = 'text';
  companyInput.placeholder = 'Company';
  companyInput.className = 'exp-input';
  companyInput.addEventListener('input', updateResume);

  container.appendChild(jobInput);
  container.appendChild(companyInput);

  document.querySelector('#experience-section .dynamic-input').appendChild(container);
}


function clearForm() {
  document.getElementById('resume-form').reset();
  document.getElementById('resume-preview').querySelectorAll('span, ul, h2').forEach(el => el.innerHTML = '');
  progress.value = 0;
}

function updateProgress() {
  const inputs = document.querySelectorAll('#resume-form input, #resume-form textarea');
  const filled = Array.from(inputs).filter(input => input.value.trim() !== '').length;
  const total = inputs.length;
  progress.value = (filled / total) * 100;
}

function downloadResume() {
  const content = document.getElementById('resume-preview').innerHTML;
  const win = window.open('', '', 'height=600,width=800');
  win.document.write('<html><head><title>Resume</title></head><body>');
  win.document.write(content);
  win.document.write('</body></html>');
  win.document.close();
  win.print();
}
