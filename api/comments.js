export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { userId } = req.query;
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'userId가 필요합니다.' });
  }

  try {
    const apiUrl = `https://api-career.saramin.co.kr/api/v2/comments/${userId}/list?size=9999`;
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://career.saramin.co.kr/',
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `사람인 API 오류: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
