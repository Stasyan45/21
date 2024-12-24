// Елементи DOM
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const contactList = document.getElementById('contact-list');

// Функція для відображення сповіщень
function showNotification(message, type = 'success') {
  const notifications = document.getElementById('notifications');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  notifications.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Отримання контактів з localStorage
function getContacts() {
  const contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
}

// Збереження контактів у localStorage
function saveContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Відображення списку контактів
function renderContacts() {
  const contacts = getContacts();
  contactList.innerHTML = '';
  contacts.forEach((contact) => {
    const li = document.createElement('li');
    li.textContent = `${contact.name} - ${contact.phone}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteContact(contact.id);
    li.appendChild(deleteBtn);
    contactList.appendChild(li);
  });
}

// Додавання нового контакту
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    showNotification('Заповніть всі поля!', 'error');
    return;
  }

  const contacts = getContacts();

  // Перевірка на існування номера
  const isDuplicate = contacts.some(contact => contact.phone === phone);
  if (isDuplicate) {
    showNotification('Контакт з таким номером вже існує!', 'error');
    return;
  }

  const newContact = {
    id: Date.now(), // Унікальний ID
    name,
    phone,
  };

  contacts.push(newContact);
  saveContacts(contacts);
  renderContacts();
  showNotification('Контакт успішно додано!');
  form.reset();
});

// Видалення контакту
function deleteContact(id) {
  let contacts = getContacts();
  contacts = contacts.filter((contact) => contact.id !== id);
  saveContacts(contacts);
  renderContacts();
  showNotification('Контакт видалено!');
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', renderContacts);
