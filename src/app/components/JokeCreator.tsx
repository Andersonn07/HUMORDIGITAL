import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

export interface UserJoke {
  id: string;
  content: string;
  category: string;
  author: string;
  createdAt: number;
  votes: {
    fire: number;
    trash: number;
  };
}

interface JokeCreatorProps {
  onJokeCreated: (joke: UserJoke) => void;
}

export function JokeCreator({ onJokeCreated }: JokeCreatorProps) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('anedotas');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: 'anedotas', label: 'Anedota Clássica' },
    { id: 'secas', label: 'Piada Seca' },
    { id: 'negro', label: 'Humor Negro' },
    { id: 'trocadilhos', label: 'Trocadilho' },
    { id: 'inteligentes', label: 'Piada Inteligente' },
    { id: 'observacional', label: 'Humor Observacional' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !author.trim()) {
      return;
    }

    const newJoke: UserJoke = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: content.trim(),
      category,
      author: author.trim(),
      createdAt: Date.now(),
      votes: {
        fire: 0,
        trash: 0,
      },
    };

    onJokeCreated(newJoke);
    setContent('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-3 group"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-semibold text-base">Criar Minha Piada</span>
        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-orange-300 dark:border-orange-800 p-6 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-500" />
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Cria a Tua Piada</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            O Teu Nome
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Como te chamas?"
            maxLength={30}
            className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Categoria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            A Tua Piada
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreve aqui a tua piada mais engraçada..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500"
            required
          />
          <div className="text-right text-xs text-neutral-500 dark:text-neutral-500 mt-1.5 font-medium">
            {content.length}/500
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setContent('');
            }}
            className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-semibold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!content.trim() || !author.trim()}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Publicar Piada
          </button>
        </div>
      </form>
    </div>
  );
}