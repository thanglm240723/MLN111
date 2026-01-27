import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChevronLeft, ChevronRight, Calendar, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details: string;
  figure?: string;
  type: 'birth' | 'work' | 'event' | 'vietnam';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1818',
    title: 'Karl Marx ra đời',
    description: 'Karl Marx sinh ngày 5/5/1818 tại Trier, Phổ (nay là Đức).',
    details: 'Marx là nhà triết học, nhà kinh tế học, nhà xã hội học và nhà cách mạng người Đức gốc Do Thái. Ông là người sáng lập chủ nghĩa Marx cùng với Engels, đặt nền móng cho chủ nghĩa cộng sản hiện đại.',
    figure: 'Karl Marx (1818-1883)',
    type: 'birth',
  },
  {
    year: '1820',
    title: 'Friedrich Engels ra đời',
    description: 'Engels sinh ngày 28/11/1820 tại Barmen, Phổ.',
    details: 'Engels là nhà triết học, nhà khoa học xã hội, nhà báo và doanh nhân người Đức. Ông là người bạn và cộng sự thân cận nhất của Marx, đồng sáng lập chủ nghĩa Marx.',
    figure: 'Friedrich Engels (1820-1895)',
    type: 'birth',
  },
  {
    year: '1848',
    title: 'Tuyên ngôn Đảng Cộng sản',
    description: 'Marx và Engels xuất bản "Tuyên ngôn của Đảng Cộng sản".',
    details: 'Đây là văn kiện chính trị quan trọng nhất của phong trào cộng sản quốc tế. Tuyên ngôn trình bày lý luận về đấu tranh giai cấp, bản chất của giai cấp tư sản và vô sản, và kết thúc bằng lời kêu gọi nổi tiếng: "Vô sản tất cả các nước, đoàn kết lại!"',
    type: 'work',
  },
  {
    year: '1867',
    title: 'Bộ Tư bản (Das Kapital)',
    description: 'Marx xuất bản tập I của bộ "Tư bản".',
    details: 'Bộ Tư bản là tác phẩm kinh tế - chính trị học quan trọng nhất của Marx, phân tích sâu sắc về phương thức sản xuất tư bản chủ nghĩa, quy luật giá trị thặng dư, và mâu thuẫn nội tại của chủ nghĩa tư bản.',
    type: 'work',
  },
  {
    year: '1870',
    title: 'V.I. Lenin ra đời',
    description: 'Vladimir Ilyich Ulyanov (Lenin) sinh ngày 22/4/1870 tại Simbirsk, Nga.',
    details: 'Lenin là nhà lý luận chính trị, nhà cách mạng vĩ đại, người lãnh đạo Cách mạng Tháng Mười Nga và sáng lập Nhà nước Xô viết. Ông đã phát triển chủ nghĩa Marx thành chủ nghĩa Mác-Lênin.',
    figure: 'V.I. Lenin (1870-1924)',
    type: 'birth',
  },
  {
    year: '1871',
    title: 'Công xã Paris',
    description: 'Công xã Paris - chính quyền vô sản đầu tiên trong lịch sử.',
    details: 'Công xã Paris là cuộc cách mạng và chính quyền tự quản của giai cấp công nhân tại Paris từ 18/3 đến 28/5/1871. Đây được coi là hình thức đầu tiên của chuyên chính vô sản, để lại nhiều bài học quý báu cho phong trào cộng sản.',
    type: 'event',
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
    details: 'Dưới sự lãnh đạo của Lenin và Đảng Bolshevik, Cách mạng Tháng Mười (7/11/1917 theo lịch mới) đã lật đổ Chính phủ lâm thời, thiết lập chính quyền Xô viết - nhà nước xã hội chủ nghĩa đầu tiên trên thế giới.',
    type: 'event',
  },
  {
    year: '1930',
    title: 'Đảng Cộng sản Việt Nam',
    description: 'Ngày 3/2/1930, Đảng Cộng sản Việt Nam được thành lập.',
    details: 'Tại Hồng Kông, Nguyễn Ái Quốc (Hồ Chí Minh) đã thống nhất các tổ chức cộng sản để thành lập Đảng Cộng sản Việt Nam. Sự kiện này đánh dấu bước ngoặt vĩ đại trong lịch sử cách mạng Việt Nam.',
    figure: 'Nguyễn Ái Quốc - Hồ Chí Minh',
    type: 'vietnam',
  },
  {
    year: '1945',
    title: 'Cách mạng Tháng Tám',
    description: 'Cách mạng Tháng Tám thành công, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    details: 'Dưới sự lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh, Cách mạng Tháng Tám năm 1945 đã giành độc lập cho dân tộc, khai sinh nước Việt Nam Dân chủ Cộng hòa - nhà nước công nông đầu tiên ở Đông Nam Á.',
    type: 'vietnam',
  },
  {
    year: '1969',
    title: 'Tư tưởng Hồ Chí Minh',
    description: 'Chủ tịch Hồ Chí Minh qua đời, để lại Di chúc và tư tưởng quý báu.',
    details: 'Tư tưởng Hồ Chí Minh là sự vận dụng sáng tạo chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam, kết hợp truyền thống tốt đẹp của dân tộc với tinh hoa văn hóa nhân loại.',
    figure: 'Chủ tịch Hồ Chí Minh (1890-1969)',
    type: 'vietnam',
  },
];

const getTypeColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'birth':
      return 'bg-gold/20 border-gold text-gold';
    case 'work':
      return 'bg-blue-500/20 border-blue-500 text-blue-400';
    case 'event':
      return 'bg-crimson/20 border-crimson text-crimson';
    case 'vietnam':
      return 'bg-red-600/20 border-red-600 text-red-500';
    default:
      return 'bg-gold/20 border-gold text-gold';
  }
};

const getTypeLabel = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'birth':
      return 'Nhân vật';
    case 'work':
      return 'Tác phẩm';
    case 'event':
      return 'Sự kiện';
    case 'vietnam':
      return 'Việt Nam';
    default:
      return '';
  }
};

export default function TimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(timelineEvents.length - 3, prev + 1));
  };

  const visibleEvents = timelineEvents.slice(currentIndex, currentIndex + 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
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
              Hành trình phát triển của chủ nghĩa Mác-Lênin từ thế kỷ XIX đến nay, 
              từ châu Âu đến Việt Nam.
            </p>
          </motion.div>

          {/* Timeline Navigation */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="gold"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-muted-foreground font-body">
              {currentIndex + 1} - {Math.min(currentIndex + 5, timelineEvents.length)} / {timelineEvents.length}
            </span>
            <Button
              variant="gold"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= timelineEvents.length - 5}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative mb-16">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            {/* Timeline Events */}
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
                    className={`w-full text-left p-4 parchment-card rounded-lg transition-all duration-300 ${
                      selectedEvent?.year === event.year
                        ? 'border-gold ring-2 ring-gold/20'
                        : 'hover:border-gold/40'
                    }`}
                  >
                    {/* Year */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-heading font-bold text-gold">
                        {event.year}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${getTypeColor(event.type)}`}>
                        {getTypeLabel(event.type)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>

                    {/* Figure if exists */}
                    {event.figure && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-gold">
                        <User className="h-3 w-3" />
                        <span>{event.figure}</span>
                      </div>
                    )}
                  </button>

                  {/* Timeline Node */}
                  <div className="flex justify-center mt-4">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedEvent?.year === event.year
                        ? 'border-gold bg-gold'
                        : 'border-gold/50 bg-background'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Selected Event Details */}
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
                    <span className="text-2xl font-heading font-bold text-gold">
                      {selectedEvent.year}
                    </span>
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full border mb-2 ${getTypeColor(selectedEvent.type)}`}>
                      {getTypeLabel(selectedEvent.type)}
                    </span>
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                  </p>
                  <p className="text-foreground leading-relaxed">
                    {selectedEvent.details}
                  </p>
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

          {/* Full Timeline List (Mobile-friendly) */}
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-center mb-8">
              <BookOpen className="inline-block h-6 w-6 mr-2 text-gold" />
              Danh sách đầy đủ
            </h2>
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-xl font-heading font-bold text-gold">
                      {event.year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${getTypeColor(event.type)}`} />
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-16 bg-gold/20" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
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
