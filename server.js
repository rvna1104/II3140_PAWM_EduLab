const express = require('express');
const path = require('path');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/main', express.static(path.join(__dirname, 'main')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/pdf', express.static(path.join(__dirname, 'pdf')));

// Home Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/main/index.html'));
});

// Login Route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/main/login.html'));
});

// Signup Route
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/main/signup.html'));
});

// Hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Login User
app.post('/login-user', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json('Please enter both username and password');
  }

  try {
    const user = await db.select('*').from('users').where({ username }).first();
    
    if (!user) {
      return res.json('Username is not registered');
    }
    
    // Verifikasi password dengan bcrypt
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return res.json('Incorrect password');
    }
    
    const token = jwt.sign({ username }, "default", { expiresIn: '3h' });
    console.log("tes")
    
    // Jika password benar
    res.json({ success:true, username: user.username, token });
  } catch (error) {
    res.json('Database error');
  }
});

// Signup User
app.post('/signup-user', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.json('Fill all the fields');
  }

  if (password !== confirmPassword) {
    return res.json('Passwords do not match');
  }

  try {
    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user dengan password yang sudah di-hash
    await db('users').insert({ username, password: hashedPassword });

    res.json({ username });
  } catch (err) {
    if (err.detail && err.detail.includes('already exists')) {
      res.json('Username already exists');
    } else {
      res.json('Error registering user');
    }
  }
});

const verifyToken = (req, res, next) => {
  // Mendapatkan token dari header
  const token = req.headers['authorization'];

  // Jika token tidak ada, kembalikan response error
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verifikasi token dengan SECRET_KEY
  jwt.verify(token, 'default', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = decoded; // Menyimpan informasi user yang sudah di-decode di request object
    next(); // Lanjut ke middleware atau route handler berikutnya
  });
};

app.post('/save-quiz-progress', async (req, res) => {
  const { username, quizId, questionNumber, answer, totalQuestions } = req.body;

  if (!username || !quizId || !questionNumber || !answer || !totalQuestions) {
    return res.json({ success: false, message: 'Data tidak lengkap' });
  }

  try {
    // Ambil progress yang ada
    let progress = await db('quiz_progress').where({ username, quiz_id: quizId }).first();

    // Jika belum ada progress, buat baru
    if (!progress) {
      progress = {
        username,
        quiz_id: quizId,
        answers: {},
        is_completed: false,
        total_questions: totalQuestions
      };
      await db('quiz_progress').insert(progress);
      progress = await db('quiz_progress').where({ username, quiz_id: quizId }).first();
    }

    // Update jawaban pada progress
    const updatedAnswers = { ...progress.answers, [questionNumber]: answer };

    // Hitung jumlah soal yang sudah dijawab
    const answeredCount = Object.keys(updatedAnswers).length;

    // Cek apakah semua soal sudah dijawab
    const isCompleted = answeredCount >= totalQuestions;

    // Update progress ke database
    await db('quiz_progress')
      .where({ username, quiz_id: quizId })
      .update({
        answers: updatedAnswers,
        is_completed: isCompleted
      });

    res.json({ success: true, isCompleted });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Gagal menyimpan progress' });
  }
});


// app.post('/save-quiz-progress', async (req, res) => {
//   const { username, quizId, questionNumber, answer, totalQuestions } = req.body;

//   if (!username || !quizId || !questionNumber || !answer) {
//     return res.json({ success: false, message: 'Data tidak lengkap' });
//   }

//   try {
//     // Ambil progress yang ada
//     let progress = await db('quiz_progress').where({ username, quiz_id: quizId }).first();

//     // Jika belum ada progress, buat baru
//     if (!progress) {
//       progress = {
//         username,
//         quiz_id: quizId,
//         answers: {},
//         is_completed: false
//       };
//       await db('quiz_progress').insert(progress);
//       progress = await db('quiz_progress').where({ username, quiz_id: quizId }).first();
//     }

//     // Update jawaban pada progress
//     const updatedAnswers = { ...progress.answers, [questionNumber]: answer };

//     // Cek apakah semua soal sudah dijawab
//     const isCompleted = Object.keys(updatedAnswers).length >= totalQuestions;

//     // Update progress ke database
//     await db('quiz_progress')
//       .where({ username, quiz_id: quizId })
//       .update({
//         answers: updatedAnswers,
//         is_completed: isCompleted
//       });

//     res.json({ success: true, isCompleted });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: 'Gagal menyimpan progress' });
//   }
// });


// app.get('/check-quiz-status', async (req, res) => {
//   const { username, quizId } = req.query;

//   try {
//     const progress = await db('quiz_progress')
//       .where({ username, quiz_id: quizId })
//       .first();

//     res.json({ isCompleted: progress ? progress.is_completed : false });
//   } catch (error) {
//     res.status(500).json({ isCompleted: false });
//   }
// });


app.get('/check-quiz-status', async (req, res) => {
  const { username, quizId } = req.query;

  try {
      const progress = await db('quiz_progress')
          .where({ username, quiz_id: quizId })
          .first();

      const isCompleted = progress ? progress.is_completed : false;
      res.json({ isCompleted, message: isCompleted ? 'Kuis sudah dikerjakan' : 'Kuis belum dikerjakan' });
  } catch (error) {
      console.error('Error fetching quiz status:', error);
      res.status(500).json({ isCompleted: false, message: 'Error checking quiz status' });
  }
});

// Start Server
app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
