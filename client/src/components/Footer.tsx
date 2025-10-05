import { Heart, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-card border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">FitnessPro</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Интеллектуальная система управления тренировками и спортивным прогрессом. 
              Достигайте своих целей с умными технологиями.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Быстрые ссылки</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Главная
                </a>
              </li>
              <li>
                <a href="/workouts" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Тренировки
                </a>
              </li>
              <li>
                <a href="/programs" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Программы
                </a>
              </li>
              <li>
                <a href="/analytics" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Аналитика
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Связаться</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-bg rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-bg rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:support@fitnesspro.com"
                className="w-10 h-10 bg-dark-bg rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="mx-1 text-red-500" size={16} fill="currentColor" /> by FitnessPro Team
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            © {currentYear} FitnessPro. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer