import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-gold/20 mt-20">
      {/* Ornate top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-gold text-2xl">☆</span>
              <span className="font-heading text-xl text-gold-gradient font-semibold">
                Triết học Mác-Lênin
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Website ôn tập cuối kỳ môn Triết học Mác-Lênin dành cho sinh viên đại học.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-gold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/timeline" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Dòng thời gian
                </Link>
              </li>
              <li>
                <Link to="/principles" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Nội dung lý thuyết
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Trắc nghiệm
                </Link>
              </li>
              <li>
                <Link to="/pdf-upload" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Tài liệu PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* References */}
          <div>
            <h4 className="font-heading text-gold mb-4">Tài liệu tham khảo</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Giáo trình Triết học Mác-Lênin - Bộ GD&ĐT</li>
              <li>• Tác phẩm của Karl Marx (1818-1883)</li>
              <li>• Tác phẩm của Friedrich Engels (1820-1895)</li>
              <li>• Tác phẩm của Vladimir Lenin (1870-1924)</li>
              <li>• Tư tưởng Hồ Chí Minh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}  Triết học Mác-Lênin
          </p>
          <p className="text-sm text-muted-foreground italic">
            "Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, vấn đề là cải tạo thế giới." — Karl Marx
          </p>
        </div>
      </div>
    </footer>
  );
}
