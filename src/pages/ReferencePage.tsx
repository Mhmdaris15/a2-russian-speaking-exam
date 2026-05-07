import { useState } from 'react';
import { motion } from 'framer-motion';
import { topics, followUpSets, situationCategories } from '../data/examData';

type Section = 'texts' | 'questions' | 'situations';

export function ReferencePage() {
  const [section, setSection] = useState<Section>('texts');
  const [showEnglish, setShowEnglish] = useState(true);

  const sections: { key: Section; label: string; icon: string }[] = [
    { key: 'texts', label: 'Тексты', icon: '📝' },
    { key: 'questions', label: 'Вопросы', icon: '❓' },
    { key: 'situations', label: 'Ситуации', icon: '🎭' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--color-text)' }}>
            Справочник
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Все материалы для подготовки к экзамену A2
          </p>
        </div>
        <button
          onClick={() => setShowEnglish(!showEnglish)}
          className="btn btn-secondary text-xs"
        >
          {showEnglish ? '🇬🇧 Скрыть EN' : '🇬🇧 Показать EN'}
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setSection(s.key)}
            className={`btn ${section === s.key ? 'btn-primary' : 'btn-secondary'} text-sm px-4 py-2`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* ── Russian & English Texts ── */}
      {section === 'texts' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {topics.map((t) => (
            <div key={t.id} className="card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                >
                  {t.id}
                </span>
                <div>
                  <h2 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>
                    {t.titleRu}
                  </h2>
                  {showEnglish && (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {t.titleEn}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-ru leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {t.textRu}
              </p>

              {showEnglish && (
                <div className="pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent)' }}>
                    English
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {t.textEn}
                  </p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Follow-up Questions ── */}
      {section === 'questions' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {followUpSets.map((set) => (
            <div key={set.topicId} className="card p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>
                  {set.topicId}. {set.topicTitleRu}
                </h2>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {set.contextNote}
                </p>
              </div>

              <div className="space-y-4">
                {set.questions.map((q, i) => (
                  <div
                    key={i}
                    className="pl-4"
                    style={{ borderLeft: '2px solid var(--color-accent)' }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                      Вопрос: {q.questionRu}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Ответ: {q.answerRu}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Extra standalone questions from the markdown */}
          <ExtraQuestions />
        </motion.div>
      )}

      {/* ── Situations ── */}
      {section === 'situations' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {situationCategories.map((cat) => (
            <div key={cat.category} className="card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>
                {cat.category}
              </h2>

              <div className="space-y-4">
                {cat.situations.map((s, i) => (
                  <div
                    key={i}
                    className="pl-4"
                    style={{ borderLeft: '2px solid var(--color-warning)' }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                      {s.scenarioRu}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {s.answerRu}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ── Extra standalone Q&A from the markdown (not tied to the 5 topic sets) ── */
function ExtraQuestions() {
  const extraSections = [
    {
      title: 'О себе и жизни в России',
      items: [
        { q: 'Сколько времени вы живете в России?', a: 'Я живу в России уже несколько месяцев. Я приехал в прошлом году.' },
        { q: 'Как долго вы изучаете русский язык?', a: 'Я изучаю русский язык тоже несколько месяцев, на подготовительном факультете в ИТМО.' },
        { q: 'Во сколько вы обычно возвращаетесь домой?', a: 'Обычно я возвращаюсь в наше общежитие на Вяземском вечером, примерно в шесть или семь часов.' },
        { q: 'Где вы уже были в Петербурге?', a: 'Я уже гулял по центру города, был на Невском проспекте и видел красивые парки.' },
        { q: 'Где в вашем городе можно изучать русский язык?', a: 'В моём родном городе Богор нет школ русского языка, поэтому его лучше изучать в интернете.' },
      ],
    },
    {
      title: 'Режим дня и выходные',
      items: [
        { q: 'Во сколько вы ложитесь спать?', a: 'Обычно я ложусь спать довольно поздно, примерно в двенадцать часов ночи.' },
        { q: 'Во сколько вы обычно встаете в выходные?', a: 'В выходные я люблю поспать, поэтому встаю в десять или одиннадцать часов утра.' },
        { q: 'Во сколько вы выходите из дома в субботу?', a: 'В субботу я выхожу из дома днём. Обычно я иду в спортзал на тренировку.' },
        { q: 'Во сколько начинаются ваши уроки в субботу?', a: 'В субботу у меня нет уроков, это мой выходной день. Я отдыхаю.' },
        { q: 'Какой ваш любимый день недели? Почему?', a: 'Мой любимый день недели — суббота, потому что я не учусь и могу пойти в спортзал или приготовить что-то вкусное.' },
      ],
    },
    {
      title: 'Интернет и увлечения',
      items: [
        { q: 'Что вы обычно делаете в интернете?', a: 'В интернете я работаю. Я программист, поэтому я много времени провожу за компьютером.' },
        { q: 'Что вы обычно смотрите на YouTube?', a: 'На YouTube я обычно смотрю видео о России, потому что в будущем я хочу делать свой влог. Ещё я слушаю классическую музыку.' },
        { q: 'Какие фильмы вы предпочитаете смотреть?', a: 'Я предпочитаю смотреть сериалы про скандинавскую мифологию, например, «Рагнарёк». Это очень интересно.' },
        { q: 'Что вы предпочитаете: фильмы или книги? Почему?', a: 'Я предпочитаю фильмы. Это быстрее, и мне нравится смотреть красивые визуальные истории.' },
        { q: 'Какое ваше любимое время года и почему?', a: 'Моё любимое время года — лето. Летом тепло, и можно гулять на природе, а я очень люблю путешествовать.' },
        { q: 'Какой ваш любимый цвет?', a: 'Мой любимый цвет — синий.' },
      ],
    },
    {
      title: 'Еда и продукты',
      items: [
        { q: 'Где вы покупаете продукты?', a: 'Я покупаю продукты в супермаркете недалеко от моего общежития.' },
        { q: 'Где можно купить пиво?', a: 'Пиво можно купить в любом супермаркете или в баре. Но я предпочитаю пить воду или чай, потому что занимаюсь спортом.' },
        { q: 'Как долго вы обычно готовите ужин?', a: 'Я очень люблю готовить. Обычно я готовлю ужин примерно один час.' },
        { q: 'Какое ваше любимое блюдо?', a: 'Моё любимое блюдо — это узбекский плов. Это очень вкусно!' },
        { q: 'Какую кухню вы любите?', a: 'Я очень люблю индонезийскую и китайскую кухню.' },
      ],
    },
    {
      title: 'Семья, планы и будущее',
      items: [
        { q: 'Чем занимаются ваши родители?', a: 'Моя мама продаёт еду, а мой папа работает инженером-электриком. Кстати, он тоже очень хорошо готовит.' },
        { q: 'В какой город вы хотите поехать и почему?', a: 'Я хочу поехать в Москву или в Карелию, потому что я люблю путешествовать и смотреть красивую природу.' },
        { q: 'В каком городе вы хотите жить? Почему?', a: 'Мне нравится жить в Санкт-Петербурге, потому что это красивый город и здесь хороший университет.' },
        { q: 'Где вы хотите работать и почему?', a: 'Я работаю программистом и хочу создать свой технологический стартап в будущем, потому что я люблю технологии.' },
      ],
    },
  ];

  return (
    <>
      {extraSections.map((sec) => (
        <div key={sec.title} className="card p-6 sm:p-8 space-y-5">
          <h2 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>
            {sec.title}
          </h2>
          <div className="space-y-4">
            {sec.items.map((item, i) => (
              <div
                key={i}
                className="pl-4"
                style={{ borderLeft: '2px solid var(--color-success)' }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  {item.q}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
