import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChevronLeft, ChevronRight, Calendar, User, BookOpen, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Interface mở rộng: hỗ trợ VR, tài liệu PDF, và biểu đồ
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details: string;
  figure?: string;
  type: 'birth' | 'work' | 'event' | 'vietnam';
  vrUrl?: string;
  documentUrl?: string; // Link đến tài liệu PDF
  chartType?: 'surplus-value'; // Loại biểu đồ cần hiển thị
}

// Component hiển thị biểu đồ giá trị thặng dư
const SurplusValueChart = () => {
  return (
    <div className="mt-8 pt-6 border-t border-gold/20">
      <h3 className="text-lg font-heading font-bold text-gold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Sơ đồ Giá trị thặng dư
      </h3>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-gold/30">
        {/* Công thức cơ bản */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-gold/10 px-6 py-3 rounded-lg border border-gold/40">
            <p className="text-xl font-heading text-gold mb-1">Công thức cơ bản</p>
            <p className="text-2xl font-bold text-white">W = C + V + M</p>
            <p className="text-xs text-gray-400 mt-2">
              W: Giá trị hàng hóa | C: Tư bản bất biến | V: Tư bản khả biến | M: Giá trị thặng dư
            </p>
          </div>
        </div>

        {/* Biểu đồ trực quan */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cột 1: Phân tích thành phần */}
          <div className="space-y-4">
            <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/40">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h4 className="font-heading font-bold text-blue-400">Tư bản bất biến (C)</h4>
              </div>
              <p className="text-sm text-gray-300">Máy móc, nguyên liệu, xưởng sản xuất</p>
              <div className="mt-2 bg-blue-500/30 h-8 rounded flex items-center justify-center text-sm font-bold text-white">
                60%
              </div>
            </div>

            <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/40">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="font-heading font-bold text-green-400">Tư bản khả biến (V)</h4>
              </div>
              <p className="text-sm text-gray-300">Tiền công trả cho công nhân</p>
              <div className="mt-2 bg-green-500/30 h-8 rounded flex items-center justify-center text-sm font-bold text-white">
                20%
              </div>
            </div>

            <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/40">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h4 className="font-heading font-bold text-red-400">Giá trị thặng dư (M)</h4>
              </div>
              <p className="text-sm text-gray-300">Lợi nhuận bị tư bản bóc lột</p>
              <div className="mt-2 bg-red-500/30 h-8 rounded flex items-center justify-center text-sm font-bold text-white">
                20%
              </div>
            </div>
          </div>

          {/* Cột 2: Tỷ suất giá trị thặng dư */}
          <div className="flex flex-col justify-center">
            <div className="bg-gold/10 p-6 rounded-lg border border-gold/40">
              <h4 className="font-heading font-bold text-gold text-center mb-4">Tỷ suất giá trị thặng dư</h4>
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-white mb-2">m' = M / V</p>
                <p className="text-sm text-gray-400">Tỷ lệ bóc lột sức lao động</p>
              </div>

              <div className="bg-crimson/20 p-4 rounded border border-crimson/40">
                <p className="text-center text-sm text-gray-300 mb-2">Ví dụ:</p>
                <p className="text-center text-xl font-bold text-crimson">m' = 20 / 20 = 100%</p>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Công nhân làm 8 giờ: 4 giờ cho bản thân, 4 giờ bị bóc lột
                </p>
              </div>
            </div>

            <div className="mt-4 bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-xs text-amber-200 text-center leading-relaxed">
                💡 <strong>Bản chất:</strong> Tư bản gia tăng giá trị thặng dư bằng cách kéo dài thời gian lao động
                hoặc tăng cường độ lao động mà không tăng lương tương ứng.
              </p>
            </div>
          </div>
        </div>

        {/* Giải thích thêm */}
        <div className="mt-6 pt-4 border-t border-gold/20">
          <p className="text-sm text-gray-300 text-center italic">
            "Giá trị thặng dư là nguồn gốc của lợi nhuận tư bản chủ nghĩa, được tạo ra từ lao động không công của giai cấp công nhân."
          </p>
        </div>
      </div>
    </div>
  );
};

const timelineEvents: TimelineEvent[] = [
  {
    year: '1818',
    title: 'Karl Marx ra đời',
    description: 'Karl Marx sinh ngày 5/5/1818 tại Trier, Phổ (nay là Đức).',
    details: 'Marx là nhà triết học, nhà kinh tế học, nhà xã hội học và nhà cách mạng người Đức gốc Do Thái. Ông là người sáng lập chủ nghĩa Marx cùng với Engels, đặt nền móng cho chủ nghĩa cộng sản hiện đại.',
    figure: 'Karl Marx (1818-1883)',
    type: 'birth',
    vrUrl: 'https://www.google.com/maps/embed?pb=!4v1770016169242!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHU5Y3EzRmc.!2m2!1d49.75393591166603!2d6.635704069658873!3f0.5978574337452773!4f9.817269171684188!5f0.4000000000000002'
  },
  {
    year: '1820',
    title: 'Friedrich Engels ra đời',
    description: 'Engels sinh ngày 28/11/1820 tại Barmen, Phổ.',
    details: 'Engels là nhà triết học, nhà khoa học xã hội, nhà báo và doanh nhân người Đức. Ông là người bạn và cộng sự thân cận nhất của Marx, đồng sáng lập chủ nghĩa Marx.',
    figure: 'Friedrich Engels (1820-1895)',
    type: 'birth',
    vrUrl: 'https://www.google.com/maps/embed?pb=!4v1770017474070!6m8!1m7!1sULeM0DN0VLejwprakF-hEw!2m2!1d51.26644869629917!2d7.190816853591282!3f226.00594223147422!4f12.334976774730876!5f0.4000000000000002'
  },
  {
    year: '1848',
    title: 'Tuyên ngôn Đảng Cộng sản',
    description: 'Marx và Engels xuất bản "Tuyên ngôn của Đảng Cộng sản".',
    details: 'Đây là văn kiện chính trị quan trọng nhất của phong trào cộng sản quốc tế. Tuyên ngôn trình bày lý luận về đấu tranh giai cấp, bản chất của giai cấp tư sản và vô sản, và kết thúc bằng lời kêu gọi nổi tiếng: "Vô sản tất cả các nước, đoàn kết lại!"',
    type: 'work',
    // Link đến bản PDF Tuyên ngôn (có thể thay bằng link thực tế)
    documentUrl: 'https://www.scribd.com/document/781979475/TUYEN-NGON-C%E1%BB%A6A-%C4%90%E1%BA%A2NG-C%E1%BB%98NG-S%E1%BA%A2N'
  },
  {
    year: '1867',
    title: 'Bộ Tư bản (Das Kapital)',
    description: 'Marx xuất bản tập I của bộ "Tư bản".',
    details: 'Bộ Tư bản là tác phẩm kinh tế - chính trị học quan trọng nhất của Marx, phân tích sâu sắc về phương thức sản xuất tư bản chủ nghĩa, quy luật giá trị thặng dư, và mâu thuẫn nội tại của chủ nghĩa tư bản.',
    type: 'work',
    chartType: 'surplus-value'
  },
  {
    year: '1870',
    title: 'V.I. Lenin ra đời',
    description: 'Vladimir Ilyich Ulyanov (Lenin) sinh ngày 22/4/1870 tại Simbirsk, Nga.',
    details: 'Lenin là nhà lý luận chính trị, nhà cách mạng vĩ đại, người lãnh đạo Cách mạng Tháng Mười Nga và sáng lập Nhà nước Xô viết. Ông đã phát triển chủ nghĩa Marx thành chủ nghĩa Mác-Lênin.',
    figure: 'V.I. Lenin (1870-1924)',
    type: 'birth',
    vrUrl: 'https://www.google.com/maps/embed?pb=!4v1770266560803!6m8!1m7!1sTWRDy7Ana1fmOJwo59MsKA!2m2!1d54.31867003270723!2d48.39780216887247!3f104.12798005568597!4f0.4967946380091206!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    year: '1871',
    title: 'Công xã Paris',
    description: 'Công xã Paris - chính quyền vô sản đầu tiên trong lịch sử.',
    details: 'Công xã Paris là cuộc cách mạng và chính quyền tự quản của giai cấp công nhân tại Paris từ 18/3 đến 28/5/1871.',
    type: 'event',
    vrUrl: 'https://www.google.com/maps/embed?pb=!4v1700000000000!6m8!1m7!1sCAoSLEFGMVFpcE03XzVfS2pWXzVfS2pWXzVfS2pWXzVfS2pWXzVfS2pW!2m2!1d48.8566!2d2.3522!3f0!4f0!5f0.7820865974627469'
  },
  {
    year: '1883',
    title: 'Karl Marx qua đời',
    description: 'Marx qua đời ngày 14/3/1883 tại London, Anh.',
    details: 'Mặc dù qua đời nhưng di sản tư tưởng của Marx vẫn tiếp tục ảnh hưởng sâu rộng đến phong trào công nhân và cộng sản quốc tế.',
    type: 'event',
  },
  {
    year: '1917',
    title: 'Cách mạng Tháng Mười Nga',
    description: 'Cách mạng xã hội chủ nghĩa Tháng Mười thành công tại Nga.',
    details: 'Thiết lập chính quyền Xô viết - nhà nước xã hội chủ nghĩa đầu tiên trên thế giới.',
    type: 'event',
    vrUrl: 'https://www.google.com/maps/embed?pb=!4v1700000000000!6m8!1m7!1sCAoSLEFGMVFpcFA2XzVfS2pWXzVfS2pWXzVfS2pWXzVfS2pWXzVfS2pW!2m2!1d55.7539!2d37.6208!3f0!4f0!5f0.7820865974627469'
  },
  {
    year: '1930',
    title: 'Đảng Cộng sản Việt Nam',
    description: 'Ngày 3/2/1930, Đảng Cộng sản Việt Nam được thành lập.',
    details: 'Tại Hồng Kông, Nguyễn Ái Quốc đã thống nhất các tổ chức cộng sản để thành lập Đảng Cộng sản Việt Nam.',
    figure: 'Nguyễn Ái Quốc - Hồ Chí Minh',
    type: 'vietnam',
  },
  {
    year: '1945',
    title: 'Cách mạng Tháng Tám',
    description: 'Cách mạng Tháng Tám thành công, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    details: 'Nhà nước công nông đầu tiên ở Đông Nam Á.',
    type: 'vietnam',
    vrUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.894344654!2d105.834159!3d21.0369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba450536767%3A0x7bb696956696e59c!2zTMSDbmcgQ2jhu6fCoHRcb_YyBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s'
  },
  {
    year: '1969',
    title: 'Tư tưởng Hồ Chí Minh',
    description: 'Chủ tịch Hồ Chí Minh qua đời, để lại Di chúc và tư tưởng quý báu.',
    details: 'Sự vận dụng sáng tạo chủ nghĩa Mác-Lênin vào điều kiện Việt Nam.',
    figure: 'Chủ tịch Hồ Chí Minh (1890-1969)',
    type: 'vietnam',
  },
];

const getTypeColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'birth': return 'bg-gold/20 border-gold text-gold';
    case 'work': return 'bg-blue-500/20 border-blue-500 text-blue-400';
    case 'event': return 'bg-crimson/20 border-crimson text-crimson';
    case 'vietnam': return 'bg-red-600/20 border-red-600 text-red-500';
    default: return 'bg-gold/20 border-gold text-gold';
  }
};

const getTypeLabel = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'birth': return 'Nhân vật';
    case 'work': return 'Tác phẩm';
    case 'event': return 'Sự kiện';
    case 'vietnam': return 'Việt Nam';
    default: return '';
  }
};

export default function TimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex((prev) => Math.min(timelineEvents.length - 5, prev + 1));

  const visibleEvents = timelineEvents.slice(currentIndex, currentIndex + 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="ornate-divider mb-8">
              <Calendar className="h-8 w-8 text-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-4">
              Dòng thời gian
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hành trình phát triển của chủ nghĩa Mác-Lênin từ thế kỷ XIX đến nay.
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Button variant="gold" size="icon" onClick={handlePrev} disabled={currentIndex === 0}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-muted-foreground font-body">
              {currentIndex + 1} - {Math.min(currentIndex + 5, timelineEvents.length)} / {timelineEvents.length}
            </span>
            <Button variant="gold" size="icon" onClick={handleNext} disabled={currentIndex >= timelineEvents.length - 5}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="relative flex justify-between gap-4 overflow-x-auto py-8">
              {visibleEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-1 min-w-[200px] max-w-[280px]"
                >
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left p-4 parchment-card rounded-lg transition-all duration-300 ${selectedEvent?.year === event.year ? 'border-gold ring-2 ring-gold/20' : 'hover:border-gold/40'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-2xl font-heading font-bold text-gold">{event.year}</span>
                      {/* Nhãn cho các loại nội dung đặc biệt */}
                      {event.vrUrl && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-red-600 text-white rounded animate-pulse">VR 360</span>
                      )}
                      {event.documentUrl && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-blue-600 text-white rounded">📄 Tài liệu</span>
                      )}
                      {event.chartType && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-green-600 text-white rounded">📊 Biểu đồ</span>
                      )}
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${getTypeColor(event.type)}`}>
                        {getTypeLabel(event.type)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  </button>
                  <div className="flex justify-center mt-4">
                    <div className={`w-4 h-4 rounded-full border-2 ${selectedEvent?.year === event.year ? 'border-gold bg-gold' : 'border-gold/50 bg-background'}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedEvent && (
            <motion.div
              key={selectedEvent.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="parchment-card p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-gold">{selectedEvent.year}</span>
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full border mb-2 ${getTypeColor(selectedEvent.type)}`}>
                      {getTypeLabel(selectedEvent.type)}
                    </span>
                    <h2 className="text-2xl font-heading font-bold text-foreground">{selectedEvent.title}</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
                  <p className="text-foreground leading-relaxed">{selectedEvent.details}</p>

                  {/* Hiển thị VR 360 */}
                  {selectedEvent.vrUrl && (
                    <div className="mt-8 pt-6 border-t border-gold/20">
                      <h3 className="text-lg font-heading font-bold text-gold mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        Trải nghiệm thực tế ảo VR 360
                      </h3>
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gold/30 bg-black shadow-inner">
                        <iframe
                          src={selectedEvent.vrUrl}
                          className="absolute inset-0 w-full h-full"
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                      <p className="text-[11px] text-center text-muted-foreground mt-2 italic">
                        * Nhấn giữ và kéo chuột để khám phá không gian
                      </p>
                    </div>
                  )}

                  {/* Hiển thị tài liệu PDF/Link */}
                  {selectedEvent.documentUrl && (
                    <div className="mt-8 pt-6 border-t border-gold/20">
                      <h3 className="text-lg font-heading font-bold text-gold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Tài liệu gốc
                      </h3>
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-xl border border-blue-500/30">
                        <p className="text-sm text-gray-300 mb-4">
                          Đọc toàn văn "Tuyên ngôn của Đảng Cộng sản" - văn kiện lịch sử vĩ đại của phong trào cộng sản quốc tế.
                        </p>
                        <a
                          href={selectedEvent.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-heading"
                        >
                          <FileText className="h-4 w-4" />
                          Xem tài liệu đầy đủ
                        </a>
                        <p className="text-xs text-gray-400 mt-3 italic">
                          * Tài liệu tiếng Việt từ Marxists Internet Archive
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hiển thị biểu đồ giá trị thặng dư */}
                  {selectedEvent.chartType === 'surplus-value' && <SurplusValueChart />}

                  {selectedEvent.figure && (
                    <div className="flex items-center gap-3 p-4 bg-gold/5 rounded-lg border border-gold/20">
                      <User className="h-5 w-5 text-gold" />
                      <span className="font-heading text-gold">{selectedEvent.figure}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Full List Mobile */}
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-center mb-8">
              <BookOpen className="inline-block h-6 w-6 mr-2 text-gold" />
              Danh sách đầy đủ
            </h2>
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <motion.div key={event.year} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-xl font-heading font-bold text-gold">{event.year}</span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${getTypeColor(event.type)}`} />
                    {index < timelineEvents.length - 1 && <div className="w-0.5 h-16 bg-gold/20" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="font-heading font-semibold text-foreground mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}