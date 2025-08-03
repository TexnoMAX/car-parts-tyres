const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы для изображений шин
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Временная база данных шин (в реальном проекте используйте БД)
let tires = [
  {
    id: 1,
    brand: 'Michelin',
    model: 'Energy Saver',
    size: '205/55 R16',
    season: 'летние',
    treadDepth: '6-7мм',
    quantity: 4,
    price: 8000,
    description: 'Отличное состояние, равномерный износ',
    images: []
  },
  {
    id: 2,
    brand: 'Continental',
    model: 'WinterContact',
    size: '225/50 R17',
    season: 'зимние',
    treadDepth: '7-8мм',
    quantity: 4,
    price: 12000,
    description: 'Зимние шины в хорошем состоянии',
    images: []
  },
  {
    id: 3,
    brand: 'Bridgestone',
    model: 'Potenza',
    size: '195/65 R15',
    season: 'летние',
    treadDepth: '5-6мм',
    quantity: 2,
    price: 5000,
    description: 'Летние шины, небольшой износ',
    images: []
  }
];

// API Routes

// Получить все шины
app.get('/api/tires', (req, res) => {
  const { season, minPrice, maxPrice, size } = req.query;
  
  let filteredTires = tires;
  
  if (season) {
    filteredTires = filteredTires.filter(tire => tire.season === season);
  }
  
  if (minPrice) {
    filteredTires = filteredTires.filter(tire => tire.price >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredTires = filteredTires.filter(tire => tire.price <= parseInt(maxPrice));
  }
  
  if (size) {
    filteredTires = filteredTires.filter(tire => tire.size.includes(size));
  }
  
  res.json(filteredTires);
});

// Получить шину по ID
app.get('/api/tires/:id', (req, res) => {
  const tire = tires.find(t => t.id === parseInt(req.params.id));
  if (!tire) {
    return res.status(404).json({ message: 'Шина не найдена' });
  }
  res.json(tire);
});

// Добавить новую шину
app.post('/api/tires', upload.array('images', 5), (req, res) => {
  const { brand, model, size, season, treadDepth, quantity, price, description } = req.body;
  
  const newTire = {
    id: tires.length + 1,
    brand,
    model,
    size,
    season,
    treadDepth,
    quantity: parseInt(quantity),
    price: parseInt(price),
    description,
    images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
  };
  
  tires.push(newTire);
  res.status(201).json(newTire);
});

// Отправка сообщения (форма обратной связи)
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message, tireId } = req.body;
  
  try {
    // Настройка транспорта для отправки email
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // или другой сервис
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || 'avto.grisha@example.com',
      subject: `Новое сообщение с сайта Авто-Гриша`,
      html: `
        <h3>Новое сообщение</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong> ${message}</p>
        ${tireId ? `<p><strong>Интересует шина ID:</strong> ${tireId}</p>` : ''}
      `
    };
    
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Сообщение отправлено успешно' });
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    res.status(500).json({ message: 'Ошибка отправки сообщения' });
  }
});

// Получить информацию о компании
app.get('/api/company', (req, res) => {
  res.json({
    name: 'Авто-Гриша',
    description: 'Продажа качественных б/у шин по доступным ценам',
    phone: '+7 (xxx) xxx-xx-xx',
    email: 'avto.grisha@example.com',
    address: 'г. Москва, ул. Примерная, д. 123',
    workingHours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00, Вс: выходной',
    services: [
      'Продажа б/у шин',
      'Консультация по подбору шин',
      'Проверка состояния шин',
      'Доставка по городу'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
