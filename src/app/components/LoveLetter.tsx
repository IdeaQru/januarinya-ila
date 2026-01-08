import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Gift, Clock, Sparkles } from 'lucide-react';

interface LoveLetterProps {
  onContinue: () => void;
}

export function LoveLetter({ onContinue }: LoveLetterProps) {
  const [showButton, setShowButton] = useState(false);

  // Show button after user scrolls to bottom or after delay
  React.useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
              y: '-100vh',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            <Heart className="w-6 h-6 text-pink-200 fill-pink-200" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-16 border-2 border-pink-200"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                Selamat Ulang Tahun, Ila!
              </h1>
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
            </div>
            <div className="text-6xl mb-4">🎉</div>
          </motion.div>

          {/* Letter Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="prose prose-lg max-w-none space-y-6 text-gray-700"
          >
            <p className="leading-relaxed">
              Tanggal 10 Januari—hari ketika dunia diberkahi dengan kehadiranmu. Dan aku? Aku cuma ikut2 an kok wkwkwkw , merayakannya dengan memberikan hadiah yang kupilih dengan serius (meskipun proses pilihnya sambil panik dan konsultasi orang-orang).
            </p>

            {/* Gift Section */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200 my-8">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-pink-500" />
                <h3 className="text-2xl font-bold text-pink-600 m-0">Hadiah Untukmu</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-rose-600 mb-2">Sebuah Jam</p>
                    <p className="text-sm leading-relaxed">
                      Karena kamu perlu diingatkan bahwa waktu itu berharga, Ila. terutama waktu-waktu mager dan lupa makan mu itu lhooo. 
                     Tapi serius, aku kasih jam ini karena setiap detik kamu , bersama  adalah momen yang tak ingin kulewatkan walau masih sering sihh sorry sandwich generation soalnya ahahaha. Mulai sekarang, kalau kamu lihat jam ini, ingat: ada orang yang rela ngingetin hal yang sering kamu sepelein soal makan terutama wkwkwkwk ,  <span className="italic">(jangan takut gendut kamu sudah sangat-sempurna dari sisi manapun sampai kapanpun.)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                 <Sparkles className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-rose-600 mb-2">Sebuah Parfum </p>
                    <p className="text-sm leading-relaxed">
                      Wangi yang manis ,berwibawa dan tentu elegan seperti seperti Aura mu. Jujur, kamu sebenarnya sudah wangi tanpa ini. Tapi aku beli parfum ini supaya setiap kali kamu pakai, kamu ingat aku. Strategi licik? Mungkin. Efektif? Mudah-mudahan. Dan kalau ada yang tanya "wangi apa sih?", kamu bisa jawab dengan bangga: <span className="italic">"Ini hadiah dari seseorang yang punya selera kelas atas!"</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-pink-600 mt-8 mb-4">
              Yang Sebenarnya Ingin Kusampaikan
            </h3>

            <p className="leading-relaxed">
              Ila, saatnya aku blak-blakan. Selama ini aku berusaha jadi teman baik, jadi orang yang bisa bikin kamu ketawa, jadi support system kamu. Tapi <span className="font-semibold text-pink-600">plot twist</span>-nya adalah: <span className="font-bold text-rose-600">aku suka sama kamu</span>. Bukan suka yang setengah-setengah atau masih ragu-ragu. Ini suka yang level "aku rela bangun pagi demi kirim pesan selamat pagi ke kamu" (padahal kamu tahu aku bukan morning person).
            </p>

            <p className="leading-relaxed">
              Aku suka caramu ketawa sampai mata menyipit. Aku suka caramu cerita hal-hal random yang bikin aku mikir "kok dia bisa kepikiran gitu ya?". Aku bahkan suka caramu yang kadang keras kepala—oke ini bikin aku stress, tapi justru itu yang bikin kamu... <span className="italic font-medium">kamu</span>. Intinya, kamu itu paket lengkap: cantik, lucu, annoying dalam porsi yang pas, dan bikin hidup lebih berwarna.
            </p>

            <p className="leading-relaxed">
              Aku nggak mau jadi orang yang cuma diam dan berharap kamu bisa baca pikiran (karena jelas-jelas kamu nggak bisa, buktinya kamu masih suka lupa padahal aku sudah berkali-kali bilang "kabarin kalok udah selesai"). Jadi ini dia: <span className="font-bold text-pink-600">aku mau lebih dari sekadar teman dan bukan sayang2 an tanpa ada confess dari aku , sehingga membuatku terkesan main2 dan penakut </span>. Aku mau jadi orang yang kamu hubungi pertama kali saat ada kabar baik atau buruk. Aku mau jadi alasan kamu senyum setiap hari dan yang tau sudah seblak macam apa yang sudah kamu buat wkwkwkwk.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 my-8">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                Komitmen Dari Aku (Yang Hopefully Nggak Dilanggar)
              </h3>
              <p className="leading-relaxed mb-4">
                Kalau kamu mau kasih kesempatan buat kita, aku punya komitmen serius oh bukan seribu enam ratus tujuh puluh delapan rius (jumlah kata nya segitu ada segitu kalok gapercaya hitung deh wkwkwkwk)  :
              </p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🙏</span>
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">Aku berjanji akan jadi pria yang lebih taat saat kamu mengingatkan .</span> Serius. Kalau kamu bilang "jangan begadang," aku akan usaha tidur lebih awal (meskipun ada bug di code aplikasi  yang menggoda untuk di-perbaiki tengah malam). Kalau kamu bilang "jangan skip makan," aku akan makan tepat waktu (meskipun project deadline ngejer-ngejer). Kalau kamu bilang "jangan banyak rokok an," aku akan... oke ini yang paling susah, tapi aku janji akan coba! Intinya, aku mau jadi versi terbaik dari diriku sendiri—versi yang layak buat kamu.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">Tapi ada satu syarat (iya, ini kontrak dua arah):</span> kamu juga harus mau mendengarkan saat aku menasehati kamu tentang hal apapun. Soal kesehatan, soal keputusan penting, soal "Ila, jangan emosi jangan kepancing dan lain2 mungkin "—aku butuh kamu dengerin aku juga.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <p className="text-sm leading-relaxed">
                    lebih tepatnya gini nih, Ila... <span className="font-semibold">aku mau kamu jadi versi yang lebih elegan saat menanggapi komentar orang.</span> Aku tahu kamu orang yang ga gampang tersinggung kecuali komentarnya udah ga aturan banget (dan aku paham kok, orang-orang emang suka ngelakuin hal bodoh). Tapi bayangin kalau kamu bisa balas dengan cara yang lebih smooth dan classy? Bukan dengan frontal yang bikin situasi makin panas, tapi dengan cara yang bikin mereka mikir "wah, dia nggak terpancing nih, keren." Percaya deh, itu jauh lebih powerful , bikin kamu keliatan lebih dewasa dan Untouchable Woman bgt. Plus, aku nggak perlu khawatir kamu tiba-tiba perang dunia ketiga sama tante-tante atau orang bajingan yang akan lewat dihidupmu. 😅
                  </p>
                </li>
              </ul>
              <p className="mt-4 text-center font-semibold text-purple-600">
                Kita tim kan? Tim yang saling support, saling ngingetin, saling bikin kesel tapi tetap sayang.Iyakan? Deal? 🤝
              </p>
              <p className="text-xs text-gray-500 italic text-center mt-2">
                (Disclaimer: Kalau aku lupa komitmen ini, kamu boleh screenshot surat ini dan kirim ulang ke aku sebagai bukti. Tapi tolong jangan di-posting ke sosmed ya, nanti orang2 malah pesen website kayak gini! 😅)
              </p>
            </div>

            <h3 className="text-2xl font-bold text-pink-600 mt-8 mb-4">
              Penutup
            </h3>

            <p className="leading-relaxed">
              Aku nggak bilang kamu harus jawab sekarang. Take your time. Tapi aku cuma pengen kamu tahu bahwa ada seseorang yang serius soal perasaannya ke kamu. Dan orang itu adalah aku— tukang software yang biasanya lebih jago ngoding daripada ngomong perasaan, tapi demi kamu, aku berani keluar dari zona nyaman (dan ini lebih menakutkan daripada debug error aplikasi aku bahkan diakhir kalimat ini aku masih dalam kondisi tangan gemeteran ahahahaah).
            </p>

            <p className="leading-relaxed font-medium text-pink-600">
              Selamat ulang tahun, Ila. Kamu luar biasa, dan aku harap tahun ini adalah tahun terbaikmu. Dan siapa tahu, mungkin setelah ini  juga akan menjadi setiap detik terbaik buat kita berdua? 
              I love you in every Second i live from now until the end of time.🎂✨
            </p>

            <div className="text-right mt-12 space-y-2">
              <p className="font-semibold text-gray-700">Dengan cinta yang tegas,</p>
              <p className="font-semibold text-gray-700">Sayang dan kepedulian yang gabisa di compare,</p>
              <p className="font-semibold text-gray-700">serta komitmen yang siap diaudit,</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mt-4">
                Fiqru
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mt-8">
              <p className="text-sm text-gray-600 text-center italic">
                <span className="font-bold">P.S.</span> Kalau kamu terima aku, berarti aku dan kamu akan menjadi tim dengan kombinasi orang random yang siap ngebantai dunia. No refund policy! 😄
              </p>
            </div>
          </motion.div>

          {/* Continue Button */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center"
            >
              <motion.button
                onClick={onContinue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <span>Lanjut ke Hitung Mundur Ulang Tahun</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}