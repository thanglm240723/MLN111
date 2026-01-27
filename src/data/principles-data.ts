import { Scale, History, Star, BookOpen, Lightbulb, Globe } from 'lucide-react';

export interface PrincipleContent {
  heading: string;
  text: string;
}

export interface Principle {
  id: string;
  title: string;
  englishTitle: string;
  icon: typeof BookOpen;
  description: string;
  content: PrincipleContent[];
}

export interface KeyConcept {
  term: string;
  definition: string;
}

export const principles: Principle[] = [
  {
    id: 'philosophy-overview',
    title: 'Khái luận về Triết học',
    englishTitle: 'Introduction to Philosophy',
    icon: Globe,
    description: 'Nguồn gốc, đối tượng và chức năng của triết học Mác-Lênin.',
    content: [
      {
        heading: 'Khái niệm Triết học',
        text: 'Triết học là một loại hình nhận thức đặc thù của con người, ra đời ở cả phương Đông và phương Tây gần như cùng một thời gian (khoảng từ thế kỷ VIII đến thế kỷ VI trước Công nguyên) tại các trung tâm văn minh lớn của nhân loại thời cổ đại. Triết học là dạng tri thức lý luận xuất hiện sớm nhất trong lịch sử các loại hình lý luận của nhân loại.',
      },
      {
        heading: 'Nguồn gốc nhận thức',
        text: 'Nhận thức thế giới là một nhu cầu tự nhiên, khách quan của con người. Triết học chính là hình thức tư duy lý luận đầu tiên trong lịch sử tư tưởng nhân loại thay thế cho tư duy huyền thoại và tôn giáo. Triết học ra đời đáp ứng nhu cầu tổng hợp, trừu tượng hóa, khái quát hóa tri thức thành những khái niệm, phạm trù, quan điểm, quy luật có tính phổ quát.',
      },
      {
        heading: 'Nguồn gốc xã hội',
        text: 'Triết học ra đời khi nền sản xuất xã hội đã có sự phân công lao động và loài người đã xuất hiện giai cấp. Tầng lớp trí thức xuất hiện với tư cách là một tầng lớp xã hội có khả năng hệ thống hóa các quan niệm, quan điểm thành học thuyết, lý luận. Như C. Mác nói: "Triết học không treo lơ lửng ở ngoài thế giới, cũng như bộ óc không tồn tại bên ngoài con người".',
      },
      {
        heading: 'Vấn đề cơ bản của Triết học',
        text: 'Vấn đề cơ bản của triết học là mối quan hệ giữa vật chất và ý thức. Việc giải quyết vấn đề này chia các nhà triết học thành hai trường phái: Chủ nghĩa duy vật (coi vật chất có trước, ý thức có sau) và Chủ nghĩa duy tâm (coi ý thức có trước, vật chất có sau).',
      },
    ],
  },
  {
    id: 'dialectical-materialism',
    title: 'Chủ nghĩa duy vật biện chứng',
    englishTitle: 'Dialectical Materialism',
    icon: Scale,
    description: 'Thế giới quan khoa học, nghiên cứu những quy luật chung nhất của tự nhiên, xã hội và tư duy.',
    content: [
      {
        heading: 'Khái niệm',
        text: 'Chủ nghĩa duy vật biện chứng là hình thức phát triển cao nhất của chủ nghĩa duy vật trong lịch sử triết học, do Marx và Engels sáng lập. Đây là thế giới quan khoa học của giai cấp vô sản, nghiên cứu mối quan hệ giữa vật chất và ý thức, cũng như những quy luật phổ biến nhất của sự vận động và phát triển.',
      },
      {
        heading: 'Phương pháp biện chứng',
        text: 'Phương pháp biện chứng nhận thức đối tượng ở trạng thái luôn vận động biến đổi, nằm trong khuynh hướng phổ quát là phát triển. Quan điểm biện chứng cho phép chủ thể nhận thức không chỉ thấy những sự vật riêng biệt mà còn thấy cả mối liên hệ giữa chúng; không chỉ thấy sự tồn tại của sự vật mà còn thấy cả sự sinh thành, phát triển và tiêu vong của sự vật.',
      },
      {
        heading: 'Ba quy luật cơ bản',
        text: '1. Quy luật thống nhất và đấu tranh của các mặt đối lập (quy luật mâu thuẫn): Là quy luật về nguồn gốc, động lực của sự vận động và phát triển.\n\n2. Quy luật chuyển hóa từ những thay đổi về lượng thành những thay đổi về chất và ngược lại (quy luật lượng-chất): Chỉ ra cách thức, phương thức của sự phát triển.\n\n3. Quy luật phủ định của phủ định: Chỉ ra khuynh hướng, con đường của sự phát triển - phát triển theo hình xoáy ốc đi lên.',
      },
      {
        heading: 'Ba hình thức của phép biện chứng',
        text: '• Phép biện chứng tự phát thời cổ đại: Các nhà biện chứng phương Đông và phương Tây thấy được sự vận động trong sự sinh thành, biến hóa vô cùng vô tận.\n\n• Phép biện chứng duy tâm: Đỉnh cao trong triết học cổ điển Đức (Kant, Hegel). Biện chứng bắt đầu từ tinh thần và kết thúc cũng ở tinh thần.\n\n• Phép biện chứng duy vật: Do C. Mác và Ph. Ăngghen xây dựng, là học thuyết về mối liên hệ phổ biến và về sự phát triển dưới hình thức hoàn bị nhất.',
      },
      {
        heading: 'Ý nghĩa phương pháp luận',
        text: 'Chủ nghĩa duy vật biện chứng đòi hỏi phải xuất phát từ thực tiễn, nhìn nhận sự vật trong mối liên hệ phổ biến và trong sự vận động, phát triển. Cần phải phân tích mâu thuẫn để tìm ra động lực phát triển của sự vật. Tư duy biện chứng là tư duy mềm dẻo, linh hoạt, không tuyệt đối hóa những ranh giới.',
      },
    ],
  },
  {
    id: 'historical-materialism',
    title: 'Chủ nghĩa duy vật lịch sử',
    englishTitle: 'Historical Materialism',
    icon: History,
    description: 'Sự vận dụng chủ nghĩa duy vật biện chứng vào nghiên cứu đời sống xã hội và lịch sử nhân loại.',
    content: [
      {
        heading: 'Khái niệm',
        text: 'Chủ nghĩa duy vật lịch sử là sự mở rộng những nguyên lý của chủ nghĩa duy vật biện chứng vào nghiên cứu đời sống xã hội. Nó nghiên cứu những quy luật chung nhất của sự phát triển xã hội loài người. Triết học Mác - Lênin đã khắc phục những hạn chế của các hệ thống triết học khác bằng cách mở rộng nghiên cứu không chỉ quy luật tự nhiên mà còn cả quy luật phổ biến của lịch sử xã hội.',
      },
      {
        heading: 'Vai trò của sản xuất vật chất',
        text: 'Sản xuất vật chất là cơ sở của sự tồn tại và phát triển xã hội. Phương thức sản xuất quyết định tính chất và kết cấu của xã hội. Lực lượng sản xuất và quan hệ sản xuất thống nhất với nhau tạo thành phương thức sản xuất. Như Đại hội VI của Đảng đã kết luận: "lực lượng sản xuất bị kìm hãm không chỉ trong trường hợp quan hệ sản xuất lạc hậu, mà cả khi quan hệ sản xuất phát triển không đồng bộ, có những yếu tố đi quá xa so với trình độ phát triển của lực lượng sản xuất".',
      },
      {
        heading: 'Đấu tranh giai cấp',
        text: 'Đấu tranh giai cấp là động lực trực tiếp của sự phát triển xã hội có giai cấp. Trong xã hội có giai cấp đối kháng, đấu tranh giai cấp tất yếu dẫn đến cách mạng xã hội - phương thức thay đổi hình thái kinh tế-xã hội. Giai cấp vô sản và giai cấp tư sản ra đời, lớn lên cùng với sự hình thành và phát triển của phương thức sản xuất tư bản chủ nghĩa.',
      },
      {
        heading: 'Hình thái kinh tế-xã hội',
        text: 'Lịch sử nhân loại đã trải qua các hình thái kinh tế-xã hội: Cộng sản nguyên thủy → Chiếm hữu nô lệ → Phong kiến → Tư bản chủ nghĩa → Xã hội chủ nghĩa và Cộng sản chủ nghĩa. Sự phát triển mạnh mẽ của lực lượng sản xuất do tác động của cuộc cách mạng công nghiệp làm cho phương thức sản xuất tư bản chủ nghĩa được củng cố vững chắc.',
      },
    ],
  },
  {
    id: 'scientific-socialism',
    title: 'Chủ nghĩa xã hội khoa học',
    englishTitle: 'Scientific Socialism',
    icon: Star,
    description: 'Học thuyết về sứ mệnh lịch sử của giai cấp công nhân và con đường đi lên chủ nghĩa xã hội.',
    content: [
      {
        heading: 'Khái niệm',
        text: 'Chủ nghĩa xã hội khoa học là một trong ba bộ phận cấu thành chủ nghĩa Mác-Lênin, nghiên cứu quy luật chuyển biến từ chủ nghĩa tư bản lên chủ nghĩa xã hội và xây dựng xã hội cộng sản chủ nghĩa. Chủ nghĩa xã hội không tưởng Pháp với các đại biểu Saint Simon và Charles Fourier là nguồn gốc lý luận trực tiếp của học thuyết này.',
      },
      {
        heading: 'Sứ mệnh lịch sử của giai cấp công nhân',
        text: 'Giai cấp công nhân là giai cấp duy nhất có khả năng lãnh đạo cách mạng xã hội chủ nghĩa, xóa bỏ chế độ người bóc lột người, xây dựng xã hội mới không có giai cấp. Đảng Cộng sản là đội tiên phong của giai cấp công nhân. Thực tiễn cách mạng của giai cấp vô sản là cơ sở chủ yếu nhất cho sự ra đời triết học Mác.',
      },
      {
        heading: 'Cách mạng xã hội chủ nghĩa',
        text: 'Cách mạng xã hội chủ nghĩa là cuộc cách mạng triệt để nhất trong lịch sử, nhằm xóa bỏ mọi hình thức áp bức, bóc lột, xây dựng xã hội mới công bằng, dân chủ, văn minh. Giai cấp vô sản xuất hiện trên vũ đài lịch sử không chỉ có sứ mệnh là "kẻ phá hoại" chủ nghĩa tư bản mà còn là lực lượng tiên phong trong cuộc đấu tranh cho nền dân chủ và tiến bộ xã hội.',
      },
      {
        heading: 'Xã hội cộng sản chủ nghĩa',
        text: 'Xã hội cộng sản chủ nghĩa là xã hội không có giai cấp, không có nhà nước, của cải làm ra dồi dào, phân phối theo nguyên tắc "làm theo năng lực, hưởng theo nhu cầu". Chủ nghĩa xã hội là giai đoạn đầu của chủ nghĩa cộng sản.',
      },
    ],
  },
  {
    id: 'marx-lenin-philosophy',
    title: 'Triết học Mác-Lênin',
    englishTitle: 'Marxist-Leninist Philosophy',
    icon: Lightbulb,
    description: 'Hệ thống quan điểm duy vật biện chứng về tự nhiên, xã hội và tư duy.',
    content: [
      {
        heading: 'Khái niệm',
        text: 'Triết học Mác - Lênin là hệ thống quan điểm duy vật biện chứng về tự nhiên, xã hội và tư duy - thế giới quan và phương pháp luận khoa học, cách mạng của giai cấp công nhân, nhân dân lao động và các lực lượng xã hội tiến bộ trong nhận thức và cải tạo thế giới.',
      },
      {
        heading: 'Điều kiện ra đời',
        text: 'Triết học Mác ra đời vào những năm 40 của thế kỷ XIX. Sự phát triển rất mạnh mẽ của lực lượng sản xuất do tác động của cuộc cách mạng công nghiệp làm cho phương thức sản xuất tư bản chủ nghĩa được củng cố vững chắc. Nước Anh đã hoàn thành cuộc cách mạng công nghiệp và trở thành cường quốc công nghiệp lớn nhất.',
      },
      {
        heading: 'Nguồn gốc lý luận',
        text: 'Triết học cổ điển Đức (đặc biệt Hegel và Feuerbach), Kinh tế chính trị học Anh (Adam Smith và David Ricardo), và Chủ nghĩa xã hội không tưởng Pháp (Saint Simon và Charles Fourier) là ba nguồn gốc lý luận trực tiếp của chủ nghĩa Mác.',
      },
      {
        heading: 'Chức năng thế giới quan',
        text: 'Thế giới quan là toàn bộ những quan điểm về thế giới và về vị trí của con người trong thế giới đó. Triết học là hạt nhân lý luận của thế giới quan. Thế giới quan duy vật biện chứng có vai trò đặc biệt quan trọng định hướng cho con người nhận thức đúng đắn thế giới hiện thực.',
      },
      {
        heading: 'Chức năng phương pháp luận',
        text: 'Phương pháp luận là hệ thống những quan điểm, những nguyên tắc có vai trò chỉ đạo việc sử dụng các phương pháp trong hoạt động nhận thức và hoạt động thực tiễn nhằm đạt kết quả tối ưu. Triết học Mác - Lênin trang bị cho con người hệ thống các khái niệm, phạm trù, quy luật làm công cụ nhận thức khoa học.',
      },
      {
        heading: 'Đóng góp của Việt Nam',
        text: 'Trong quá trình lãnh đạo cách mạng Việt Nam, Chủ tịch Hồ Chí Minh và Đảng Cộng sản Việt Nam đã vận dụng sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể Việt Nam. Đảng đã làm rõ thêm lý luận về thời kỳ quá độ đi lên chủ nghĩa xã hội, phát triển kinh tế thị trường định hướng xã hội chủ nghĩa.',
      },
    ],
  },
];

export const keyConcepts: KeyConcept[] = [
  { 
    term: 'Vật chất', 
    definition: 'Thực tại khách quan được cho bởi cảm giác và tồn tại độc lập với ý thức. Theo định nghĩa của Lenin: "Vật chất là phạm trù triết học dùng để chỉ thực tại khách quan được đem lại cho con người trong cảm giác, được cảm giác của chúng ta chép lại, chụp lại, phản ánh và tồn tại không lệ thuộc vào cảm giác".' 
  },
  { 
    term: 'Ý thức', 
    definition: 'Sự phản ánh thế giới khách quan vào bộ não người, là thuộc tính của vật chất có tổ chức cao. Ý thức là sản phẩm của quá trình phát triển lịch sử - tự nhiên và lịch sử - xã hội.' 
  },
  { 
    term: 'Mâu thuẫn', 
    definition: 'Sự thống nhất và đấu tranh của các mặt đối lập, là nguồn gốc của sự vận động và phát triển. Quy luật mâu thuẫn là hạt nhân của phép biện chứng.' 
  },
  { 
    term: 'Quy luật', 
    definition: 'Mối liên hệ bản chất, tất yếu, phổ biến, lặp lại của các sự vật, hiện tượng. Quy luật phản ánh những mặt, những thuộc tính, những mối liên hệ phổ biến nhất của hiện thực khách quan.' 
  },
  { 
    term: 'Lực lượng sản xuất', 
    definition: 'Tổng hợp các yếu tố vật chất và tinh thần tạo ra của cải vật chất: người lao động và tư liệu sản xuất. Sự phát triển của lực lượng sản xuất quyết định sự phát triển của quan hệ sản xuất.' 
  },
  { 
    term: 'Quan hệ sản xuất', 
    definition: 'Quan hệ giữa người với người trong quá trình sản xuất: sở hữu tư liệu sản xuất, tổ chức quản lý, phân phối sản phẩm. Quan hệ sản xuất phải phù hợp với trình độ phát triển của lực lượng sản xuất.' 
  },
  { 
    term: 'Thế giới quan', 
    definition: 'Toàn bộ những quan điểm về thế giới và về vị trí của con người trong thế giới đó. Triết học là hạt nhân lý luận của thế giới quan.' 
  },
  { 
    term: 'Phương pháp luận', 
    definition: 'Hệ thống những quan điểm, nguyên tắc chỉ đạo việc sử dụng các phương pháp trong hoạt động nhận thức và thực tiễn nhằm đạt kết quả tối ưu.' 
  },
  { 
    term: 'Phép biện chứng', 
    definition: 'Học thuyết về mối liên hệ phổ biến và về sự phát triển. Phép biện chứng duy vật phản ánh hiện thực đúng như nó tồn tại, là phương pháp luận tối ưu của mọi khoa học.' 
  },
];
