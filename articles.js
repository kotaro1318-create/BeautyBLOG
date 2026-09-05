// Beauty DO ノート:記事データ
// 出典は米国皮膚科学会(AAD)関連の査読論文、Statista、Euromonitor International、
// Grand View Research、EU公式規制文書、PMC(PubMed Central)掲載の査読付き論文などの
// 信頼できる情報源から選定しています。
//
// date は "YYYY-MM-DD" 形式。表示形式は config.js の SITE_CONFIG.dateFormat で
// 一括変更できます(この配列の日付そのものは変更していません)。

const ARTICLES = [
  {
    title: "SPF50なのに焼ける?その差、塗る量のせいかもしれません",
    date: "2026-09-05",
    conclusion: "SPFの数値通りの効果を得るには、多くの人が実際に塗っている量よりずっと多い日焼け止めが必要です。",
    body: "「ちゃんとSPF50を塗ったのに焼けた」という経験、ありませんか?実はSPFの数値は、規定量(1平方センチあたり2mg)をきちんと塗った場合のテスト結果です。SPF15でUVBの約93%、SPF30で約96〜97%、SPF50で約98%、SPF100でも約99%と、実は数値が上がるほど効果の伸びしろは小さくなっていきます。それでも数値にこだわる理由は、多くの人が実際には規定量の半分以下しか塗っていないから。半分の量では、SPF50でも体感的にはSPF20〜30程度まで効果が落ちてしまうのです。さらに面白いのは、国によって認可されているUV吸収剤の数が違うこと。EUでは34種類のUV吸収剤が認可されているのに対し、米国は16種類にとどまります。日本や韓国では「PA」という別の指標でUVA(シワやたるみの原因になる波長)への強さを表しており、SPFだけでは分からない情報を補っています。塗る量と塗り直しの頻度こそが、実は成分選び以上に効果を左右するポイントかもしれません。",
    visual: `
      <div class="viz">
        <p class="viz-title">表:SPFの数値とUVBカット率の関係</p>
        <div class="viz-table-wrap">
          <table class="viz-table">
            <thead>
              <tr><th>SPF</th><th>UVBカット率</th></tr>
            </thead>
            <tbody>
              <tr><td>15</td><td class="num">約93%</td></tr>
              <tr><td>30</td><td class="num">約96〜97%</td></tr>
              <tr><td>50</td><td class="num">約98%</td></tr>
              <tr><td>100</td><td class="num">約99%</td></tr>
            </tbody>
          </table>
        </div>
        <p class="viz-note">出典:Cureus「Global Perspectives on Regional Sun Protection Factor (SPF) Requirements」</p>
      </div>
      <div class="viz">
        <p class="viz-title">図:地域別の認可UV吸収剤 数</p>
        <div class="viz-bars">
          <div class="bar-row">
            <span class="bar-label">EU</span>
            <span class="bar-track"><span class="bar-fill" style="width:100%"></span></span>
            <span class="bar-value">34種類</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">米国</span>
            <span class="bar-track"><span class="bar-fill" style="width:47%"></span></span>
            <span class="bar-value">16種類</span>
          </div>
        </div>
        <p class="viz-note">出典:EWG's Guide to Sunscreens「Do other countries have better sunscreens than the U.S.?」</p>
      </div>
    `,
    sources: [
      { label: "Cureus「Global Perspectives on Regional Sun Protection Factor (SPF) Requirements: Scientific and Regulatory Insights」", url: "https://www.cureus.com/articles/459797-global-perspectives-on-regional-sun-protection-factor-spf-requirements-scientific-and-regulatory-insights" },
      { label: "EWG's Guide to Sunscreens「Do other countries have better sunscreens than the U.S.?」", url: "https://www.ewg.org/sunscreen/report/do-other-countries-have-better-sunscreens-than-the-u-s/" }
    ]
  },
  {
    title: "「効く成分」を科学的に検証:レチノール・ビタミンC・ナイアシンアミドの実力",
    date: "2026-09-05",
    conclusion: "定番のスキンケア成分は、それぞれ異なる作用のしくみで臨床試験による裏付けを持っています。",
    body: "スキンケア成分は数え切れないほどありますが、実際に臨床試験で効果が確認されているものは限られています。レチノールは肌のコラーゲンを分解する酵素(MMP)の働きを抑えつつ、コラーゲンの生成を促す仕組みが報告されています。ビタミンCは紫外線でできる活性酸素を消去する抗酸化物質で、10%濃度の美容液を12週間使った臨床試験では、シワの減少と真皮のコラーゲン増加が確認されました。ナイアシンアミドは細胞のエネルギー代謝やDNA修復に関わるNAD⁺という物質のもとになる成分で、5%濃度で12週間使用した臨床試験では、小じわ・色素沈着・赤み・弾力の見た目の改善が報告されています。ヒアルロン酸は自分の重さの1000倍もの水を抱え込める成分で、8週間の使用で角質層の水分保持とバリア機能の指標が改善したという報告もあります。「なんとなく良さそう」ではなく、それぞれの成分がどんな仕組みで、どのくらいの期間で効果を示すのかを知っておくと、選び方の解像度がぐっと上がります。",
    visual: `
      <div class="viz">
        <p class="viz-title">表:主要成分と臨床試験で報告された変化</p>
        <div class="viz-table-wrap">
          <table class="viz-table">
            <thead>
              <tr><th>成分</th><th>主な作用</th><th>報告された変化</th></tr>
            </thead>
            <tbody>
              <tr><td>レチノール</td><td>コラーゲン分解抑制・生成促進</td><td>シワ・ハリの改善</td></tr>
              <tr><td>ビタミンC(10%)</td><td>抗酸化・コラーゲン生成促進</td><td>12週間でシワ減少</td></tr>
              <tr><td>ナイアシンアミド(5%)</td><td>NAD⁺産生・DNA修復支援</td><td>12週間で色素沈着・赤み改善</td></tr>
              <tr><td>ヒアルロン酸</td><td>自重の1000倍の保水</td><td>8週間で水分保持改善</td></tr>
            </tbody>
          </table>
        </div>
        <p class="viz-note">出典:PMC「Mechanistic Basis and Clinical Evidence for the Applications of Nicotinamide」ほか</p>
      </div>
    `,
    sources: [
      { label: "PMC「Mechanistic Basis and Clinical Evidence for the Applications of Nicotinamide (Niacinamide) to Control Skin Aging and Pigmentation」", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8389214/" },
      { label: "MDPI「Clinical and Instrumental Evaluation of the Anti-Aging Effectiveness of a Cream Based on Hyaluronic Acid and Vitamin C」", url: "https://www.mdpi.com/2079-9284/12/4/177" }
    ]
  },
  {
    title: "K-beautyはなぜ止まらない?世界が熱狂する韓国コスメの正体",
    date: "2026-09-05",
    conclusion: "韓国コスメの輸出額は2025年に5年連続で過去最高を更新しており、世界的なブームは一過性ではなさそうです。",
    body: "「K-beautyはもう一段落したのでは」と思いきや、数字を見るとむしろ勢いは増しています。2025年の韓国コスメの輸出額は102億ドルに達し、前年比21.4%増と5年連続で過去最高を更新しました。市場規模の推計は調査会社によって幅があり、韓国製コスメに絞った推計では120億〜160億ドル程度、K-beauty的な処方や世界中のインスパイア商品まで含めた広い定義では1000億ドルを超える推計も出ています。この差自体が、K-beautyがもはや「韓国製品」という枠を超えて、ひとつの美容スタイルとして世界中のブランドに取り入れられていることを物語っています。成長を後押ししているのは、SNSでのバイラルな広がりと、消費者のスキンケアへの意識の高まり。10ステップスキンケアのような手厚いルーティン文化や、シートマスク、発酵成分、独自のテクスチャー開発力などが、世界の消費者に「新しい体験」として刺さり続けているのが背景にあります。ある予測では、2030年までに市場は210億ドル規模に達し、今よりさらに36%拡大するとも見込まれています。",
    visual: `
      <div class="viz">
        <p class="viz-title">図:韓国コスメ輸出額の推移(推計)</p>
        <div class="viz-bars">
          <div class="bar-row">
            <span class="bar-label">2024年</span>
            <span class="bar-track"><span class="bar-fill" style="width:84%"></span></span>
            <span class="bar-value">約84億ドル</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">2025年</span>
            <span class="bar-track"><span class="bar-fill" style="width:100%"></span></span>
            <span class="bar-value">102億ドル</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">2030年(予測)</span>
            <span class="bar-track"><span class="bar-fill" style="width:100%"></span></span>
            <span class="bar-value">約210億ドル規模へ</span>
          </div>
        </div>
        <p class="viz-note">出典:Euromonitor International「K-Beauty Growth Hits $15 Billion as Global Demand Surges」(2024年輸出額は前年比21.4%増から逆算した概算)</p>
      </div>
    `,
    sources: [
      { label: "Euromonitor International「K-Beauty Growth Hits $15 Billion as Global Demand Surges」", url: "https://www.euromonitor.com/newsroom/press-releases/august-2026/k-beauty-global-growth-beauty-market-2026" },
      { label: "IMARC Group「K-Beauty Products Market Size, Share & Growth Forecast」", url: "https://www.imarcgroup.com/k-beauty-products-market" }
    ]
  },
  {
    title: "引き算の美容、日本の「J-beauty」哲学が世界で注目される理由",
    date: "2026-09-05",
    conclusion: "J-beautyは「治す」より「防ぐ」を軸にした引き算のスキンケア哲学で、世界の美容トレンドにも影響を与えています。",
    body: "10ステップの手厚いK-beautyルーティンが話題になる一方、じわじわと世界で注目を集めているのが日本発の「J-beauty」です。最大の特徴は、ダメージが起きてから対処するのではなく、そもそもダメージを起こさせない「予防」を軸に置いていること。たくさんの製品を重ねるのではなく、質の良い少数の製品を、肌本来の働きに寄り添う形で使うミニマルな考え方が土台にあります。米・緑茶・酒粕などの発酵成分を取り入れた処方や、ダブル洗顔の文化、日常的に紫外線対策をする習慣なども、実はJ-beauty由来として世界のトレンドに広がってきた経緯があります。派手な「10ステップ」ではなく、地味だけれど毎日続けられる「儀式」としてスキンケアを捉える感覚こそが、情報過多で疲れてしまった海外の消費者にとって新鮮に映っているようです。「足す」美容と「引く」美容、どちらが正解ということではなく、自分の肌と生活リズムに合った哲学を選ぶという視点が、これからのスキンケア選びには欠かせません。",
    visual: `
      <div class="viz">
        <p class="viz-title">表:J-beautyとK-beautyの哲学の違い(傾向)</p>
        <div class="viz-table-wrap">
          <table class="viz-table">
            <thead>
              <tr><th></th><th>J-beauty</th><th>K-beauty</th></tr>
            </thead>
            <tbody>
              <tr><td>基本姿勢</td><td>予防・引き算</td><td>多層ケア・足し算</td></tr>
              <tr><td>ルーティン</td><td>少数の高品質アイテム</td><td>10ステップなど手厚いケア</td></tr>
              <tr><td>代表的な成分</td><td>米・緑茶・酒粕などの発酵成分</td><td>カタツムリ・シカ・シートマスクなど</td></tr>
              <tr><td>キーワード</td><td>儀式・自己ケア</td><td>トレンド・体験</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    sources: [
      { label: "Shikō Beauty Collective「What Is J-Beauty? Understanding Japanese Skincare Philosophy」", url: "https://shikobeauty.com/pages/what-is-j-beauty-understanding-japanese-skincare-philosophy" },
      { label: "VEXX Skincare「J-Beauty 2026: How Japanese Skincare's Minimalist Rituals, Ferments and Hydration Are Reshaping Global Beauty」", url: "https://vexxskincare.com/blogs/skincare-tips-and-tricks/j-beauty-2026-how-japanese-skincares-minimalist-rituals-ferments-and-hydration-are-reshaping-global-beauty" }
    ]
  },
  {
    title: "寝不足の顔、ちゃんと科学的根拠があります",
    date: "2026-09-05",
    conclusion: "睡眠不足やストレスは、コルチゾールの増加や肌のバリア機能の低下を通じて、肌の老化サインを増やすことが分かっています。",
    body: "「寝不足の日は肌の調子が悪い気がする」というのは、単なる気のせいではありません。眠っている間、肌では成長ホルモンの分泌が増え、コラーゲンの生成や血流の改善など、修復と再生のプロセスが進んでいます。睡眠の質が低い人ほど、経表皮水分蒸散量(肌からの水分の蒸発量)が多く、バリア機能が乱れたあとの回復も遅く、紫外線を浴びたあとの赤みの回復も遅いことが報告されています。さらに睡眠不足の人ほど、色素沈着や小じわなど老化のサインが多く見られたというデータもあります。ストレスも見逃せない要因で、慢性的なストレスはコルチゾールというホルモンを増やし、皮脂分泌を増やしてニキビを悪化させたり、湿疹や乾癬の症状を悪化させたりすることが知られています。ストレスは傷の治りを遅くし、バリア機能そのものを弱めることも報告されています。食事面では、果物や野菜に含まれる抗酸化物質が活性酸素と戦い、オメガ3脂肪酸が炎症を抑える一方、加工食品や糖分の摂りすぎはニキビやくすみを悪化させる可能性があるとされています。スキンケア用品を変える前に、まず睡眠・ストレス・食事という土台を見直す価値は十分にありそうです。",
    visual: `
      <div class="viz">
        <p class="viz-title">図:睡眠・ストレス・食事が肌に与える主な影響</p>
        <div class="viz-stats">
          <div class="stat-tile">
            <span class="stat-value">睡眠</span>
            <span class="stat-label">成長ホルモン↑・コラーゲン生成↑<br>睡眠不足で水分蒸散量↑、UV後の回復↓</span>
          </div>
          <div class="stat-tile">
            <span class="stat-value">ストレス</span>
            <span class="stat-label">コルチゾール↑で皮脂↑<br>ニキビ・湿疹・乾癬の悪化、治癒遅延</span>
          </div>
          <div class="stat-tile">
            <span class="stat-value">食事</span>
            <span class="stat-label">抗酸化物質・オメガ3で炎症抑制<br>加工食品・糖分の摂りすぎでニキビ悪化の可能性</span>
          </div>
        </div>
      </div>
    `,
    sources: [
      { label: "MDPI「The Sleep–Skin Axis: Clinical Insights and Therapeutic Approaches for Inflammatory Dermatologic Conditions」", url: "https://www.mdpi.com/2673-6179/5/3/13" },
      { label: "International Journal of Community Medicine and Public Health「Influence of lifestyle factors-sleep patterns and stress on skin health and ageing amongst the general population in India」", url: "https://www.ijcmph.com/index.php/ijcmph/article/view/12610" }
    ]
  },
  {
    title: "スキンケアからマイクロビーズが消える日:EUの新規制を分かりやすく解説",
    date: "2026-09-05",
    conclusion: "EUは2023年の規制でスキンケア中のマイクロプラスチックを段階的に禁止しており、製品カテゴリーごとに移行期限が定められています。",
    body: "「洗顔スクラブのつぶつぶ」や「ファンデーションのなめらかな質感」の裏側には、実はマイクロプラスチックが使われていることがあります。EUは2023年に採択した規則(Regulation (EU) 2023/2055)で、意図的に添加された合成ポリマー微粒子(直径5mm未満で、有機性・水に溶けず、分解されにくいもの)を段階的に規制することを決めました。対象になりやすい成分は、洗顔スクラブなどに使われるポリエチレンやポリプロピレンのマイクロビーズ、パウダーやファンデーションに使われるナイロン粒子、質感を作るアクリレート共重合体などです。移行期限は製品カテゴリーごとに異なり、シャワージェルなどの「洗い流すタイプ」は2027年10月17日まで、クリームや乳液などの「つけたままのタイプ」は2029年10月17日まで、メイクや口紅、ネイル製品は最も長く2035年10月17日までとされています。ただしメイク・口紅・ネイル製品については2031年10月17日以降、マイクロプラスチックを含む場合はその旨をラベルに表示することが義務付けられます。日本の消費者から見るとまだ先の話に感じるかもしれませんが、グローバルに展開するブランドの処方は今後こうした基準に合わせて静かに変わっていくはずです。",
    visual: `
      <div class="viz">
        <p class="viz-title">表:EUマイクロプラスチック規制の移行期限</p>
        <div class="viz-table-wrap">
          <table class="viz-table">
            <thead>
              <tr><th>製品カテゴリー</th><th>移行期限</th></tr>
            </thead>
            <tbody>
              <tr><td>洗い流すタイプ(スクラブ・シャワージェル等)</td><td>2027年10月17日</td></tr>
              <tr><td>つけたままのタイプ(クリーム・乳液等)</td><td>2029年10月17日</td></tr>
              <tr><td>メイク・口紅・ネイル製品</td><td>2035年10月17日(2031年10月17日以降は表示義務)</td></tr>
            </tbody>
          </table>
        </div>
        <p class="viz-note">出典:REACH24H「EU Microplastics Restriction: First Key Deadline on Oct 17, 2025」</p>
      </div>
    `,
    sources: [
      { label: "REACH24H「EU Microplastics Restriction: First Key Deadline on Oct 17, 2025」", url: "https://en.reach24h.com/news/insights/chemical/eu-microplastics-spm-restriction-deadline" },
      { label: "BeautyMatter「EU Microplastics Regulation: The Global Beauty Impact」", url: "https://beautymatter.com/articles/eu-microplastics-regulation-the-global-beauty-impact" }
    ]
  },
  {
    title: "世界の化粧品市場、実はどのくらいの規模?推計を並べてみると見えてくるもの",
    date: "2026-09-05",
    conclusion: "世界の化粧品市場は調査会社ごとに推計の幅があるものの、2025年時点でおおむね3000億〜4400億ドル規模とされ、今も年3〜7%前後で成長を続けています。",
    body: "「化粧品市場はどのくらい大きいのか」という質問に、実は一つの正解はありません。調査会社によって、2025年の世界市場規模の推計は3300億ドルから4400億ドルまで幅があります。この差は、どこまでを「化粧品」に含めるかという定義の違いによるものです。パーソナルケア用品まで広く含めるか、スキンケア・メイクなど狭い意味の化粧品に絞るかで、数字は大きく変わってきます。とはいえ共通しているのは「成長が続いている」という点。Statistaのデータでは2025年の世界市場は前年比で約3.5%成長したとされ、各社の予測でも2026年以降おおむね年4〜7%程度のペースで拡大が見込まれています。数字の大小に一喜一憂するより、「これだけ幅のある推計が出るほど、化粧品市場は定義が難しいくらい多様化・グローバル化している」という事実の方が、実は面白いポイントかもしれません。",
    visual: `
      <div class="viz">
        <p class="viz-title">図:2025年 世界の化粧品市場規模(調査会社別推計)</p>
        <div class="viz-bars">
          <div class="bar-row">
            <span class="bar-label">Grand View<br><span class="bar-sub">Research</span></span>
            <span class="bar-track"><span class="bar-fill" style="width:75%"></span></span>
            <span class="bar-value">3301億ドル</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">Fortune Business<br><span class="bar-sub">Insights</span></span>
            <span class="bar-track"><span class="bar-fill" style="width:81%"></span></span>
            <span class="bar-value">3547億ドル</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">Expert Market<br><span class="bar-sub">Research</span></span>
            <span class="bar-track"><span class="bar-fill" style="width:82%"></span></span>
            <span class="bar-value">3612億ドル</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">Precedence<br><span class="bar-sub">Research</span></span>
            <span class="bar-track"><span class="bar-fill" style="width:97%"></span></span>
            <span class="bar-value">4247億ドル</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">Research and<br><span class="bar-sub">Markets</span></span>
            <span class="bar-track"><span class="bar-fill" style="width:100%"></span></span>
            <span class="bar-value">4391億ドル</span>
          </div>
        </div>
        <p class="viz-note">出典:各社公表資料をもとに作成。定義の違いにより推計に幅があります。</p>
      </div>
    `,
    sources: [
      { label: "Statista「Global growth of the cosmetics market 2025」", url: "https://www.statista.com/statistics/297070/growth-rate-of-the-global-cosmetics-market/" },
      { label: "Grand View Research「Cosmetics Market Size, Share, Growth | Industry Report」", url: "https://www.grandviewresearch.com/industry-analysis/cosmetics-market" }
    ]
  },
  {
    title: "朝のスキンケアが22分から14分に。「スキニマリズム」という新常識",
    date: "2026-09-05",
    conclusion: "「たくさん塗る」から「厳選して少なく塗る」へ、世界の消費者のスキンケア行動は明確にシフトしています。",
    body: "何年も「スキンケアは足すもの」という空気がありましたが、ここへ来て潮目が変わってきました。「スキニマリズム(skinimalism)」と呼ばれるこの流れは、肌を健やかに保つために本当に必要な、少数の効果的な製品だけを選ぶという考え方です。スキンサイクリングやスラギングなど、次々と現れたトレンドを試した結果、逆にバリア機能を乱してしまった人が増えたことへの反動とも言われています。Statistaの調査によると、朝のビューティールーティンにかける時間は2020年の平均22分から2025年には14分にまで短縮しました。典型的なスキニマリズムのルーティンは、朝は洗顔または水洗い・狙いを定めた美容液1本・日焼け止め入り保湿剤の3〜4アイテム、夜も4〜5アイテム程度に絞られます。実際、消費者の75%がスキンケア製品を3個以下しか買わなくなっているというデータもあり、これは業界の競争のあり方そのものを変えつつあります。製品を10個から4個に減らすと、月々の美容費は平均40〜60%削減できるという試算も。「増やす」ことに疲れた人にとって、今こそ持ち物を見直すいいタイミングなのかもしれません。",
    visual: `
      <div class="viz">
        <p class="viz-title">図:朝のビューティールーティンにかける平均時間</p>
        <div class="viz-bars">
          <div class="bar-row">
            <span class="bar-label">2020年</span>
            <span class="bar-track"><span class="bar-fill" style="width:100%"></span></span>
            <span class="bar-value">22分</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">2025年</span>
            <span class="bar-track"><span class="bar-fill" style="width:64%"></span></span>
            <span class="bar-value">14分</span>
          </div>
        </div>
        <p class="viz-note">出典:Statista調査(2025年)、GCI Magazine「Less is More: How Skinimalism is Redefining Beauty Routines and Packaging」より引用</p>
      </div>
      <div class="viz">
        <p class="viz-title">図:スキンケア購入行動の変化</p>
        <div class="viz-stats">
          <div class="stat-tile">
            <span class="stat-value">75%</span>
            <span class="stat-label">スキンケア製品を3個以下しか購入しない消費者の割合</span>
          </div>
          <div class="stat-tile">
            <span class="stat-value">40〜60%</span>
            <span class="stat-label">製品を10個から4個に減らした場合の月間美容費の削減幅</span>
          </div>
        </div>
      </div>
    `,
    sources: [
      { label: "Global Cosmetic Industry (GCI Magazine)「Less is More: How Skinimalism is Redefining Beauty Routines and Packaging」", url: "https://www.gcimagazine.com/consumers-markets/news/22938448/less-is-more-how-skinimalism-is-redefining-beauty-routines-and-packaging" },
      { label: "IML Testing & Research「Skinimalism Trend 2026: Fewer Products, More Effective」", url: "https://www.imlresearch.com/en/skinimalism-trend-fewer-products-effective/" }
    ]
  },
  {
    title: "抜け毛と頭皮バリア:見落とされがちな「土台」のケア科学",
    date: "2026-09-05",
    conclusion: "健康な頭皮バリアを保つことが、フケや炎症だけでなく抜け毛の予防にもつながることが分かってきています。",
    body: "髪のケアというと、シャンプーやトリートメントなど「髪そのもの」に意識が向きがちですが、実はその土台である「頭皮バリア」こそが鍵を握っています。健康な頭皮バリアは、水分の蒸発・雑菌・酸化ストレスから頭皮を守る働きを持ち、これが乱れるとフケや炎症、さらには抜け毛にまでつながることが報告されています。ある臨床試験では、頭皮に特化した処方を12週間使ったところ経表皮水分蒸散量(TEWL)が61.5%減少し、24週間では69%まで改善したというデータもあり、頭皮バリアの回復力の高さがうかがえます。研究の最前線でも動きがあり、2025年2月にはバージニア大学の研究チームが、薄毛が進んだ頭皮にも残存する新しいタイプの幹細胞集団を発見したと発表しました。また男性型脱毛症(AGA)は頭皮の微生物バランスの乱れ(ディスバイオシス)と関連しているという報告もあり、「頭皮環境を整えること」自体が今後の脱毛ケアの重要なテーマになりつつあります。育毛剤選びの前に、まずは頭皮の乾燥や炎症をケアすることから始めてみる価値がありそうです。",
    visual: `
      <div class="viz">
        <p class="viz-title">図:頭皮特化処方によるTEWL(経表皮水分蒸散量)の改善</p>
        <div class="viz-bars">
          <div class="bar-row">
            <span class="bar-label">12週間後</span>
            <span class="bar-track"><span class="bar-fill" style="width:61.5%"></span></span>
            <span class="bar-value">-61.5%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">24週間後</span>
            <span class="bar-track"><span class="bar-fill" style="width:69%"></span></span>
            <span class="bar-value">-69%</span>
          </div>
        </div>
        <p class="viz-note">出典:MDhair「Damaged scalp barrier, dandruff and hair loss」</p>
      </div>
    `,
    sources: [
      { label: "MDhair「Damaged scalp barrier, dandruff and hair loss」", url: "https://www.mdhair.co/article/is-damaged-scalp-barrier-the-cause-for-dandruff-and-hair-loss" },
      { label: "PMC「Microbial dysbiosis and its diagnostic potential in androgenetic alopecia」", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12172500/" }
    ]
  },
  {
    title: "「クリーン」の意味が変わった。エビデンス重視になったサステナブル美容の今",
    date: "2026-09-05",
    conclusion: "クリーンビューティーは「無添加」を訴えるだけの時代から、科学的根拠に基づく検証データの開示を求められる時代へと変わりつつあります。",
    body: "「オーガニック」「無添加」といった言葉だけで支持を集められた時代は終わりつつあります。世界のクリーンビューティー市場は2025年時点で105億ドル規模とされ、2033年には353億ドルまで拡大すると予測されるほど成長を続けていますが、同時に消費者の目も厳しくなっています。ある調査では、半数以上の消費者が「クリーンビューティー」を謳う製品の主張の信憑性に疑問を持っていると回答しました。この空気を受けて、業界の重心は「生分解性」「再生可能な原料比率」「ライフサイクルデータ」といった、検証可能な科学的根拠を示す方向へと移りつつあります。2025年には美容ブランドの約8割が、持続可能なパッケージや原料調達、倫理的なサプライチェーンに力を入れると見込まれており、安全性データを公開したり、第三者機関による試験結果を開示したり、信頼できる認証を取得したりする動きが広がっています。「クリーン」という言葉を鵜呑みにするのではなく、その裏にどんなデータや検証があるかを見る視点が、これからの製品選びには欠かせません。",
    visual: `
      <div class="viz">
        <p class="viz-title">図:世界のクリーンビューティー市場規模の推移(予測)</p>
        <div class="viz-bars">
          <div class="bar-row">
            <span class="bar-label">2025年</span>
            <span class="bar-track"><span class="bar-fill" style="width:30%"></span></span>
            <span class="bar-value">105億ドル</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">2033年(予測)</span>
            <span class="bar-track"><span class="bar-fill" style="width:100%"></span></span>
            <span class="bar-value">353億ドル</span>
          </div>
        </div>
        <p class="viz-note">出典:Grand View Research「Clean Beauty Market Size, Share & Trends Report」(CAGR 16.8%の予測に基づく)</p>
      </div>
    `,
    sources: [
      { label: "Grand View Research「Clean Beauty Market Size, Share & Trends Report, 2026-2033」", url: "https://www.grandviewresearch.com/industry-analysis/clean-beauty-market-report" },
      { label: "Personal Care Insights「Clean Beauty trades ‘free-from’ labels for science-led standards」", url: "https://www.personalcareinsights.com/news/clean-beauty-science-led-standards.html" }
    ]
  },
  {
    title: "赤外線は肌の老化を早める?それとも守る?「量」で結論が変わる最新知見",
    date: "2026-09-05",
    conclusion: "近赤外線が肌の老化を進めるか抑えるかは、照射量の違いによって結論が大きく変わる可能性が指摘されています。",
    body: "紫外線対策はすっかり定着しましたが、実は太陽光が肌に届けるエネルギーの内訳を見ると、紫外線はわずか7%ほどで、可視光線が39%、そして赤外線が54%と最も大きな割合を占めています。中でも近赤外線(波長760〜1400nm)は紫外線と違って肌の表面にとどまらず、真皮や皮下組織まで届くため、老化への影響をめぐって専門家の間でも意見が分かれてきました。「シワやたるみの改善」「傷の治りを早める」「紫外線で傷んだDNAの修復を助ける」といった肌に優しい報告がある一方で、「コラーゲンを壊す酵素(MMP-1)を増やす」「肌の抗酸化力を下げる」という真逆の報告も存在します。興味深いのは、老化を促進すると結論づけた研究の多くが、実際の真夏の屋外(平均20mW/cm²、ピークでも40mW/cm²程度)よりおよそ10倍も強い光を実験で当てていたという点。赤外線そのものの善悪というより、どれだけの量を浴びたかという条件の違いが、正反対の結論を生んでいた可能性が高いのです。紫外線だけでなく、赤外線についても「浴びすぎない」くらいの意識を持っておくのがちょうど良さそうです。",
    visual: `
      <div class="viz">
        <p class="viz-title">図:太陽光が肌に届けるエネルギーの内訳</p>
        <div class="viz-bars">
          <div class="bar-row">
            <span class="bar-label">紫外線</span>
            <span class="bar-track"><span class="bar-fill" style="width:13%"></span></span>
            <span class="bar-value">約7%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">可視光線</span>
            <span class="bar-track"><span class="bar-fill" style="width:72%"></span></span>
            <span class="bar-value">約39%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">赤外線</span>
            <span class="bar-track"><span class="bar-fill" style="width:100%"></span></span>
            <span class="bar-value">約54%</span>
          </div>
        </div>
      </div>
      <div class="viz">
        <p class="viz-title">図:近赤外線の強さ、実際と実験条件の差</p>
        <div class="viz-stats">
          <div class="stat-tile">
            <span class="stat-value">20〜40mW/cm²</span>
            <span class="stat-label">真夏の屋外での近赤外線の強さ(平均〜ピーク)</span>
          </div>
          <div class="stat-tile">
            <span class="stat-value">約10倍</span>
            <span class="stat-label">「老化を促進する」とした研究の多くで使われた照射量の目安</span>
          </div>
        </div>
      </div>
    `,
    sources: [
      { label: "『美容の科学』(日本コスメティック協会)" },
      { label: "Monthly Book Derma. No.262「再考!美容皮膚診療－自然な若返りを望む患者への治療のコツ－」(森脇真一 編集企画)" }
    ]
  }
];

// build.js（Node）から読み込むためのエクスポート。ブラウザでは無視される。
if (typeof module !== "undefined") {
  module.exports = { ARTICLES };
}
