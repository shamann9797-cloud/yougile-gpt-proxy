# YouGile → OpenAI proxy (Vercel)
1) Импортируйте папку на Vercel.
2) В переменных окружения проекта добавьте OPENAI_API_KEY.
3) Deploy → получите URL `https://ВАШ_ПРОЕКТ.vercel.app/api/gpt`.
Проверка:
curl -X POST https://ВАШ_ПРОЕКТ.vercel.app/api/gpt -H "Content-Type: application/json" -d '{"prompt":"Сделай чек-лист документов","context":{"title":"Задача"}}'
