import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Clock, BookOpen, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import heroStatue from '@/assets/hero-statue.jpg';

const features = [
  {
    icon: Clock,
    title: 'Dòng thời gian',
    description: 'Khám phá lịch sử phát triển của chủ nghĩa Mác-Lênin qua các mốc quan trọng.',
    link: '/timeline',
  },
  {
    icon: BookOpen,
    title: 'Nội dung lý thuyết',
    description: 'Tìm hiểu các nguyên lý cơ bản: duy vật biện chứng, duy vật lịch sử, CNXH khoa học.',
    link: '/principles',
  },
  {
    icon: HelpCircle,
    title: 'Trắc nghiệm',
    description: 'Kiểm tra kiến thức với các câu hỏi trắc nghiệm được thiết kế theo chuẩn đề thi.',
    link: '/quiz',
  },
  {
    icon: FileText,
    title: 'Tài liệu PDF',
    description: 'Tải lên và xem các tài liệu ôn tập ở định dạng PDF.',
    link: '/pdf-upload',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background with marble texture */}
        <div className="absolute inset-0 marble-texture opacity-50" />
        
        {/* Decorative columns on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 column-border-left opacity-30" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 column-border-right opacity-30" />

        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1 mb-6 text-sm font-body text-gold border border-gold/30 rounded-full">
                  Đồ án cuối kỳ • Đại học
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
              >
                <span className="text-gold-gradient">Triết học Mác-Lênin</span>
                <br />
                <span className="text-foreground">Ôn tập Cuối Kỳ</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-4"
              >
                Thế giới quan khoa học và phương pháp luận cách mạng
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-base text-muted-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Triết học Mác-Lênin là thế giới quan khoa học của giai cấp công nhân và nhân dân lao động, 
                là cơ sở lý luận của chủ nghĩa xã hội khoa học, là kim chỉ nam cho hành động cách mạng.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link to="/timeline">
                  <Button variant="classical" size="xl">
                    <Clock className="mr-2 h-5 w-5" />
                    Khám phá dòng thời gian
                  </Button>
                </Link>
                <Link to="/principles">
                  <Button variant="gold" size="xl">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Xem nội dung
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-4 border border-gold/20 rounded-lg" />
                <div className="absolute -inset-8 border border-gold/10 rounded-lg" />
                
                <img
                  src={heroStatue}
                  alt="Classical philosopher statue"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-lg" />
              </div>

              {/* Floating quote */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -right-4 bottom-20 max-w-xs parchment-card p-4 rounded-lg"
              >
                <p className="text-sm italic text-muted-foreground">
                  "Không có lý luận cách mạng thì cũng không thể có phong trào cách mạng."
                </p>
                <p className="text-xs text-gold mt-2">— V.I. Lenin</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gold/60"
          >
            <ChevronRight className="h-8 w-8 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="ornate-divider">
              <span className="text-2xl">✦</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gold-gradient mb-4">
              Khám phá nội dung
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Website được thiết kế để hỗ trợ sinh viên ôn tập hiệu quả với các tính năng được tổ chức khoa học.
            </p>
          </div>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={feature.link}>
                  <div className="parchment-card p-6 rounded-lg h-full hover:border-gold/40 transition-all duration-300 group">
                    <feature.icon className="h-10 w-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Xem thêm</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-gold text-6xl mb-6">"</div>
            <blockquote className="text-2xl md:text-3xl font-heading italic text-foreground leading-relaxed mb-6">
              Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, 
              vấn đề là cải tạo thế giới.
            </blockquote>
            <cite className="text-gold font-heading text-lg">
              — Karl Marx, Luận cương về Feuerbach (1845)
            </cite>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="parchment-card p-8 md:p-12 rounded-xl text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-gold/20 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-gold/20 rounded-br-xl" />

            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Sẵn sàng ôn tập?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Bắt đầu với bài trắc nghiệm để kiểm tra kiến thức hoặc xem lại các nguyên lý cơ bản.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quiz">
                <Button variant="crimson" size="xl">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Làm bài trắc nghiệm
                </Button>
              </Link>
              <Link to="/pdf-upload">
                <Button variant="marble" size="xl">
                  <FileText className="mr-2 h-5 w-5" />
                  Tải tài liệu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
