export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: string;
}

export const questions: Question[] = [
  // Khái luận về Triết học
  {
    id: 1,
    question: 'Triết học ra đời vào khoảng thời gian nào?',
    options: [
      'Thế kỷ I đến thế kỷ III sau Công nguyên',
      'Thế kỷ VIII đến thế kỷ VI trước Công nguyên',
      'Thế kỷ X đến thế kỷ XII sau Công nguyên',
      'Thế kỷ XV đến thế kỷ XVII sau Công nguyên',
    ],
    correctAnswer: 1,
    explanation: 'Triết học ra đời ở cả phương Đông và phương Tây gần như cùng một thời gian, khoảng từ thế kỷ VIII đến thế kỷ VI trước Công nguyên, tại các trung tâm văn minh lớn của nhân loại thời cổ đại.',
    category: 'Khái luận về Triết học',
  },
  {
    id: 2,
    question: 'Theo C. Mác, triết học có đặc điểm gì?',
    options: [
      'Triết học tồn tại độc lập với thế giới',
      'Triết học không treo lơ lửng ở ngoài thế giới',
      'Triết học chỉ nghiên cứu về tự nhiên',
      'Triết học không liên quan đến con người',
    ],
    correctAnswer: 1,
    explanation: 'C. Mác nói: "Triết học không treo lơ lửng ở ngoài thế giới, cũng như bộ óc không tồn tại bên ngoài con người". Điều này nhấn mạnh triết học có nguồn gốc từ đời sống xã hội.',
    category: 'Khái luận về Triết học',
  },
  {
    id: 3,
    question: 'Vấn đề cơ bản của triết học là gì?',
    options: [
      'Mối quan hệ giữa con người và tự nhiên',
      'Mối quan hệ giữa vật chất và ý thức',
      'Mối quan hệ giữa lý luận và thực tiễn',
      'Mối quan hệ giữa cá nhân và xã hội',
    ],
    correctAnswer: 1,
    explanation: 'Vấn đề cơ bản của triết học là mối quan hệ giữa vật chất và ý thức. Việc giải quyết vấn đề này chia các nhà triết học thành hai trường phái: Chủ nghĩa duy vật và Chủ nghĩa duy tâm.',
    category: 'Khái luận về Triết học',
  },

  // Chủ nghĩa duy vật biện chứng
  {
    id: 4,
    question: 'Theo chủ nghĩa duy vật biện chứng, đâu là quy luật chỉ ra nguồn gốc, động lực của sự phát triển?',
    options: [
      'Quy luật chuyển hóa từ những thay đổi về lượng thành những thay đổi về chất',
      'Quy luật thống nhất và đấu tranh của các mặt đối lập',
      'Quy luật phủ định của phủ định',
      'Quy luật nhân quả',
    ],
    correctAnswer: 1,
    explanation: 'Quy luật thống nhất và đấu tranh của các mặt đối lập (quy luật mâu thuẫn) chỉ ra nguồn gốc, động lực bên trong của sự vận động và phát triển.',
    category: 'Chủ nghĩa duy vật biện chứng',
  },
  {
    id: 5,
    question: 'Quy luật nào chỉ ra cách thức, phương thức của sự phát triển?',
    options: [
      'Quy luật mâu thuẫn',
      'Quy luật lượng - chất',
      'Quy luật phủ định của phủ định',
      'Quy luật nhân quả',
    ],
    correctAnswer: 1,
    explanation: 'Quy luật chuyển hóa từ những thay đổi về lượng thành những thay đổi về chất và ngược lại (quy luật lượng-chất) chỉ ra cách thức, phương thức của sự phát triển.',
    category: 'Chủ nghĩa duy vật biện chứng',
  },
  {
    id: 6,
    question: 'Quy luật phủ định của phủ định chỉ ra điều gì?',
    options: [
      'Nguồn gốc của sự phát triển',
      'Cách thức của sự phát triển',
      'Khuynh hướng, con đường của sự phát triển',
      'Nguyên nhân của sự vận động',
    ],
    correctAnswer: 2,
    explanation: 'Quy luật phủ định của phủ định chỉ ra khuynh hướng, con đường của sự phát triển - phát triển theo hình xoáy ốc đi lên, kế thừa có chọn lọc những yếu tố tích cực.',
    category: 'Chủ nghĩa duy vật biện chứng',
  },
  {
    id: 7,
    question: 'Phép biện chứng duy vật được xây dựng bởi ai?',
    options: [
      'Hegel và Kant',
      'Feuerbach và Hegel',
      'C. Mác và Ph. Ăngghen',
      'Lenin và Stalin',
    ],
    correctAnswer: 2,
    explanation: 'Phép biện chứng duy vật được C. Mác và Ph. Ăngghen xây dựng, sau đó được V.I. Lênin và các nhà triết học hậu thế phát triển. Đây là học thuyết về mối liên hệ phổ biến và về sự phát triển dưới hình thức hoàn bị nhất.',
    category: 'Chủ nghĩa duy vật biện chứng',
  },
  {
    id: 8,
    question: 'Theo triết học Mác-Lênin, vật chất là gì?',
    options: [
      'Những thứ có thể nhìn thấy và sờ được',
      'Thực tại khách quan được cho bởi cảm giác và tồn tại độc lập với ý thức',
      'Tất cả những gì tồn tại trên thế giới',
      'Những vật thể có khối lượng',
    ],
    correctAnswer: 1,
    explanation: 'Theo định nghĩa của Lenin, vật chất là "thực tại khách quan được cho bởi cảm giác của chúng ta, tồn tại không phụ thuộc vào cảm giác".',
    category: 'Chủ nghĩa duy vật biện chứng',
  },

  // Chủ nghĩa duy vật lịch sử
  {
    id: 9,
    question: 'Theo chủ nghĩa duy vật lịch sử, đâu là cơ sở của sự tồn tại và phát triển xã hội?',
    options: [
      'Tư tưởng và văn hóa',
      'Sản xuất vật chất',
      'Tôn giáo và đạo đức',
      'Chính trị và pháp luật',
    ],
    correctAnswer: 1,
    explanation: 'Theo chủ nghĩa duy vật lịch sử, sản xuất vật chất là cơ sở của sự tồn tại và phát triển xã hội. Phương thức sản xuất quyết định tính chất và kết cấu của xã hội.',
    category: 'Chủ nghĩa duy vật lịch sử',
  },
  {
    id: 10,
    question: 'Đấu tranh giai cấp là gì trong xã hội có giai cấp?',
    options: [
      'Nguồn gốc của mọi tư tưởng',
      'Động lực trực tiếp của sự phát triển xã hội',
      'Nguyên nhân của sự suy thoái',
      'Kết quả của phát triển kinh tế',
    ],
    correctAnswer: 1,
    explanation: 'Đấu tranh giai cấp là động lực trực tiếp của sự phát triển xã hội có giai cấp. Trong xã hội có giai cấp đối kháng, đấu tranh giai cấp tất yếu dẫn đến cách mạng xã hội.',
    category: 'Chủ nghĩa duy vật lịch sử',
  },

  // Triết học Mác-Lênin
  {
    id: 11,
    question: 'Triết học Mác ra đời vào thời gian nào?',
    options: [
      'Những năm 20 của thế kỷ XVIII',
      'Những năm 40 của thế kỷ XIX',
      'Những năm 60 của thế kỷ XIX',
      'Đầu thế kỷ XX',
    ],
    correctAnswer: 1,
    explanation: 'Triết học Mác ra đời vào những năm 40 của thế kỷ XIX, trong bối cảnh cuộc cách mạng công nghiệp phát triển mạnh mẽ và sự củng cố của phương thức sản xuất tư bản chủ nghĩa.',
    category: 'Triết học Mác-Lênin',
  },
  {
    id: 12,
    question: 'Ba nguồn gốc lý luận trực tiếp của chủ nghĩa Mác là gì?',
    options: [
      'Triết học Hy Lạp, Kinh tế học Anh, Chủ nghĩa xã hội Đức',
      'Triết học cổ điển Đức, Kinh tế chính trị học Anh, Chủ nghĩa xã hội không tưởng Pháp',
      'Triết học Pháp, Kinh tế học Đức, Chủ nghĩa xã hội Anh',
      'Triết học Nga, Kinh tế học Pháp, Chủ nghĩa xã hội Đức',
    ],
    correctAnswer: 1,
    explanation: 'Theo V.I. Lênin, ba nguồn gốc lý luận trực tiếp của chủ nghĩa Mác là: Triết học cổ điển Đức (Hegel, Feuerbach), Kinh tế chính trị học Anh (Adam Smith, David Ricardo), và Chủ nghĩa xã hội không tưởng Pháp (Saint Simon, Charles Fourier).',
    category: 'Triết học Mác-Lênin',
  },
  {
    id: 13,
    question: 'Thế giới quan là gì?',
    options: [
      'Cách nhìn về thế giới tự nhiên',
      'Toàn bộ những quan điểm về thế giới và về vị trí của con người trong thế giới đó',
      'Quan điểm về vũ trụ',
      'Lý thuyết về sự sống',
    ],
    correctAnswer: 1,
    explanation: 'Thế giới quan là toàn bộ những quan điểm về thế giới và về vị trí của con người trong thế giới đó. Triết học là hạt nhân lý luận của thế giới quan.',
    category: 'Triết học Mác-Lênin',
  },
  {
    id: 14,
    question: 'Phương pháp luận có vai trò gì?',
    options: [
      'Chỉ dùng trong nghiên cứu khoa học',
      'Chỉ đạo việc sử dụng các phương pháp trong nhận thức và thực tiễn',
      'Chỉ áp dụng trong triết học',
      'Không liên quan đến hoạt động thực tiễn',
    ],
    correctAnswer: 1,
    explanation: 'Phương pháp luận là hệ thống những quan điểm, nguyên tắc có vai trò chỉ đạo việc sử dụng các phương pháp trong hoạt động nhận thức và hoạt động thực tiễn nhằm đạt kết quả tối ưu.',
    category: 'Triết học Mác-Lênin',
  },

  // Chủ nghĩa xã hội khoa học
  {
    id: 15,
    question: 'Theo chủ nghĩa xã hội khoa học, giai cấp nào có sứ mệnh lãnh đạo cách mạng xã hội chủ nghĩa?',
    options: [
      'Giai cấp nông dân',
      'Giai cấp tư sản',
      'Giai cấp công nhân',
      'Tầng lớp trí thức',
    ],
    correctAnswer: 2,
    explanation: 'Giai cấp công nhân là giai cấp có sứ mệnh lịch sử lãnh đạo cách mạng xã hội chủ nghĩa, xóa bỏ chế độ người bóc lột người, xây dựng xã hội mới.',
    category: 'Chủ nghĩa xã hội khoa học',
  },
  {
    id: 16,
    question: 'Đâu là đặc điểm của xã hội cộng sản chủ nghĩa?',
    options: [
      'Có giai cấp và nhà nước',
      'Không có giai cấp, không có nhà nước',
      'Chỉ có giai cấp công nhân',
      'Có nhiều giai cấp bình đẳng',
    ],
    correctAnswer: 1,
    explanation: 'Xã hội cộng sản chủ nghĩa là xã hội không có giai cấp, không có nhà nước, của cải làm ra dồi dào, phân phối theo nguyên tắc "làm theo năng lực, hưởng theo nhu cầu".',
    category: 'Chủ nghĩa xã hội khoa học',
  },

  // Lịch sử
  {
    id: 17,
    question: 'Karl Marx sinh năm nào?',
    options: ['1815', '1818', '1820', '1825'],
    correctAnswer: 1,
    explanation: 'Karl Marx sinh ngày 5 tháng 5 năm 1818 tại Trier, Phổ (nay là Đức).',
    category: 'Lịch sử',
  },
  {
    id: 18,
    question: 'Tác phẩm "Tuyên ngôn của Đảng Cộng sản" được xuất bản năm nào?',
    options: ['1845', '1848', '1867', '1871'],
    correctAnswer: 1,
    explanation: 'Tuyên ngôn của Đảng Cộng sản được Marx và Engels xuất bản năm 1848, đây là văn kiện chính trị quan trọng nhất của phong trào cộng sản quốc tế.',
    category: 'Lịch sử',
  },
  {
    id: 19,
    question: 'Cách mạng Tháng Mười Nga diễn ra năm nào?',
    options: ['1905', '1914', '1917', '1921'],
    correctAnswer: 2,
    explanation: 'Cách mạng xã hội chủ nghĩa Tháng Mười thành công vào ngày 7/11/1917 (theo lịch mới), dưới sự lãnh đạo của V.I. Lenin và Đảng Bolshevik.',
    category: 'Lịch sử',
  },
  {
    id: 20,
    question: 'Đảng Cộng sản Việt Nam được thành lập ngày tháng năm nào?',
    options: [
      'Ngày 2/9/1930',
      'Ngày 3/2/1930',
      'Ngày 19/5/1930',
      'Ngày 2/3/1930',
    ],
    correctAnswer: 1,
    explanation: 'Đảng Cộng sản Việt Nam được thành lập ngày 3/2/1930 tại Hồng Kông, do Nguyễn Ái Quốc (Hồ Chí Minh) chủ trì hội nghị hợp nhất.',
    category: 'Lịch sử',
  },
  {
    id: 21,
    question: 'Công xã Paris diễn ra năm nào và tồn tại trong bao lâu?',
    options: [
      '1870, 100 ngày',
      '1871, 72 ngày',
      '1872, 60 ngày',
      '1871, 90 ngày',
    ],
    correctAnswer: 1,
    explanation: 'Công xã Paris diễn ra từ 18/3 đến 28/5/1871, tồn tại 72 ngày. Đây được coi là hình thức đầu tiên của chuyên chính vô sản trong lịch sử.',
    category: 'Lịch sử',
  },
  {
    id: 22,
    question: 'Bộ "Tư bản" (Das Kapital) tập I được Marx xuất bản năm nào?',
    options: ['1857', '1867', '1877', '1883'],
    correctAnswer: 1,
    explanation: 'Bộ Tư bản tập I được xuất bản năm 1867. Đây là tác phẩm kinh tế - chính trị học quan trọng nhất của Marx.',
    category: 'Lịch sử',
  },

  // Đóng góp của Lenin và Việt Nam
  {
    id: 23,
    question: 'V.I. Lênin đã viết tác phẩm nào được coi là "di chúc triết học"?',
    options: [
      'Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán',
      'Về tác dụng của chủ nghĩa duy vật chiến đấu',
      'Nhà nước và cách mạng',
      'Bệnh ấu trĩ tả khuynh',
    ],
    correctAnswer: 1,
    explanation: 'Tác phẩm "Về tác dụng của chủ nghĩa duy vật chiến đấu" được coi như là di chúc triết học của V.I. Lênin, trong đó nêu cơ sở khoa học cho nhiệm vụ tiếp tục phát triển triết học Mác.',
    category: 'Đóng góp của Lenin',
  },
  {
    id: 24,
    question: 'Theo Lênin, cái gì quan trọng nhất bảo đảm cho thắng lợi của chế độ xã hội mới?',
    options: [
      'Quân đội mạnh',
      'Năng suất lao động',
      'Tư tưởng tiên tiến',
      'Tài nguyên thiên nhiên',
    ],
    correctAnswer: 1,
    explanation: 'V.I. Lênin chỉ rõ: "xét đến cùng năng suất lao động là cái quan trọng nhất, chủ yếu nhất bảo đảm cho thắng lợi của chế độ xã hội mới".',
    category: 'Đóng góp của Lenin',
  },
  {
    id: 25,
    question: 'Đảng Cộng sản Việt Nam có đóng góp gì vào phát triển triết học Mác-Lênin?',
    options: [
      'Chỉ áp dụng nguyên bản lý luận Mác-Lênin',
      'Làm rõ thêm lý luận về thời kỳ quá độ và kinh tế thị trường định hướng XHCN',
      'Bác bỏ hoàn toàn triết học Mác-Lênin',
      'Chỉ tập trung vào lĩnh vực quân sự',
    ],
    correctAnswer: 1,
    explanation: 'Đảng Cộng sản Việt Nam đã làm rõ thêm lý luận về thời kỳ quá độ đi lên chủ nghĩa xã hội, phát triển kinh tế thị trường định hướng xã hội chủ nghĩa, giải quyết đúng đắn giữa đổi mới kinh tế và đổi mới chính trị.',
    category: 'Việt Nam',
  },
];

export const STORAGE_KEY = 'quiz_progress';
