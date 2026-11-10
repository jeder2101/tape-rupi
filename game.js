
"use strict";

/* =========================================================
   TAPE-RUPI — JORNADA DE APRENDIZAGEM NHANDEWA

   PASTAS DOS ARQUIVOS:

   IMAGENS:
   assets/imagens/

   ÁUDIOS:
   assets/audio/

   TELA INICIAL:
   assets/tela-de-inicio/

   CORREÇÕES:
   1. Primeira pergunta obrigatoriamente ADJAKÁ.
   2. Alternativas somente em texto.
   3. Todas as imagens na mesma pasta.
   4. Todos os áudios na mesma pasta.
   5. Contagem de animais com imagens reais.
   6. Números de 0 a 7 preservados.
   ========================================================= */


/* =========================================================
   1. CAMINHOS DOS ARQUIVOS
   ========================================================= */

const ASSET = {
    images: "assets/imagens/",
    audio: "assets/audio/",
    home: "assets/tela-de-inicio/"
};


/* Todas as imagens são carregadas de assets/imagens/. */

function getImagePath(item) {
    return ASSET.images + item.file;
}


/* =========================================================
   2. NÚMEROS NHANDEWA
   ========================================================= */

const NUMBER_VOCABULARY = [
    {value:0, word:"DJERE", audio:"numero-0.mp3"},
    {value:1, word:"PETEĨ", audio:"numero-1.mp3"},
    {value:2, word:"MÕKÕI", audio:"numero-2.mp3"},
    {value:3, word:"MBOAPY", audio:"numero-3.mp3"},
    {value:4, word:"IRUNDY", audio:"numero-4.mp3"},
    {value:5, word:"NIRUI", audio:"numero-5.mp3"},
    {value:6, word:"YPÉ", audio:"numero-6.mp3"},
    {value:7, word:"TXA'I", audio:"numero-7.mp3"}
];

const NUMBER_PENDING = [8,9,10];


/* =========================================================
   3. VOCABULÁRIO NHANDEWA
   ========================================================= */
const VOCABULARY = [


    // ---------- OBJETOS ----------
    { word:"KUTXÁ",        meaning:"colher",         category:"OBJETOS", audio:"kutxa.mp3",        file:"kutxa.png" },
    { word:"KUTXÁ RAKWÁ",  meaning:"garfo",          category:"OBJETOS", audio:"kutxa_rakwa.mp3",  file:"kutxa-rakwa.png" },
    { word:"KARÓ",         meaning:"copo/caneca",    category:"OBJETOS", audio:"karo.mp3",         file:"karo.png" },
    { word:"DJAPEPÓ",      meaning:"panela",         category:"OBJETOS", audio:"djapepo.mp3",      file:"djapepo.png" },
    { word:"ADJAKÁ",       meaning:"cesto",          category:"OBJETOS", audio:"adjaka.mp3",       file:"adjaka.png" },
    { word:"IRYMPẼ",       meaning:"peneira",        category:"OBJETOS", audio:"irympe.mp3",       file:"irympe.png" },
    { word:"TIPITI",       meaning:"espremedor",     category:"OBJETOS", audio:"tipiti.mp3",       file:"tipiti.png" },
    // NOVO — Glossário Nhanembiaporu (vol. 2, p. 56)
    { word:"ATXÁ",         meaning:"machado",        category:"OBJETOS", audio:"atxa.mp3",         file:"atxa.png" },
    { word:"ANGWAPÚ",      meaning:"tambor",         category:"OBJETOS", audio:"angwapu.mp3",      file:"angwapu.png" },
    { word:"GWYRAPÁ",      meaning:"arco",           category:"OBJETOS", audio:"gwyrapa.mp3",      file:"gwyrapa.png" },
    { word:"GWYRARAKWÁ",   meaning:"lança",          category:"OBJETOS", audio:"gwywarakwa.mp3",   file:"gwywarakwa.png" },
    { word:"KANGWAÁ",      meaning:"cocar",          category:"OBJETOS", audio:"kangwaa.mp3",      file:"kangwaa.png" },
    { word:"KYÁ",          meaning:"rede",           category:"OBJETOS", audio:"kya.mp3",          file:"kya.png" },
    { word:"MBARAKÁ",      meaning:"maraca",         category:"OBJETOS", audio:"mbaraka.mp3",      file:"mbaraka.png" },
    { word:"MBO'Y",        meaning:"colar",          category:"OBJETOS", audio:"mbo-y.mp3",        file:"mbo-y.png" },
    { word:"MIMBY",        meaning:"flauta",         category:"OBJETOS", audio:"mimby.mp3",        file:"mimby.png" },
    { word:"PETỸNGWÁ",     meaning:"cachimbo",       category:"OBJETOS", audio:"petyngwa.mp3",     file:"petyngwa.png" },
    { word:"TAMBEÓ",       meaning:"roupa tradicional", category:"OBJETOS", audio:"tambeo.mp3",    file:"tambeo.png" },
    { word:"U'Y",          meaning:"flecha",         category:"OBJETOS", audio:"u-y.mp3",          file:"u-y.png" },

    // ---------- ALIMENTOS ----------
    { word:"AKADJU",       meaning:"caju",           category:"ALIMENTOS", audio:"akadju.mp3",     file:"akadju.png" },
    { word:"PAKOWÁ",       meaning:"banana",         category:"ALIMENTOS", audio:"pakowa.mp3",     file:"pakowa.png" },
    { word:"TSANDIÁ",      meaning:"melancia",       category:"ALIMENTOS", audio:"tsandia.mp3",    file:"tsandia.png" },
    { word:"AWATI",        meaning:"milho",          category:"ALIMENTOS", audio:"awati.mp3",      file:"awati.png" },
    { word:"MANDI'O",      meaning:"mandioca",       category:"ALIMENTOS", audio:"mandio.mp3",     file:"mandio.png" },
    { word:"KAMBY",        meaning:"leite",          category:"ALIMENTOS", audio:"kamby.mp3",      file:"kamby.png" },
    { word:"TSO'O",        meaning:"carne",          category:"ALIMENTOS", audio:"tsoo.mp3",       file:"tsoo.png" },
    // NOVO — vol. 2, p. 27
    { word:"ANDAÍ",        meaning:"abóbora",        category:"ALIMENTOS", audio:"andai.mp3",      file:"andai.png" },
    { word:"AROI",         meaning:"arroz",          category:"ALIMENTOS", audio:"aroi.mp3",       file:"aroi.png" },
    { word:"AREMÁ",        meaning:"trigo",          category:"ALIMENTOS", audio:"arema.mp3",      file:"arema.png" },
    { word:"AWATI-KU'I",   meaning:"fubá",           category:"ALIMENTOS", audio:"awati-kui.mp3",  file:"awati-kui.png" },
    { word:"DJATY",        meaning:"batata-doce",    category:"ALIMENTOS", audio:"djaty.mp3",      file:"djaty.png" },
    { word:"EÍ",           meaning:"mel de abelhas", category:"ALIMENTOS", audio:"ei.mp3",         file:"ei.png" },
    { word:"KANÃ",         meaning:"cana-de-açúcar", category:"ALIMENTOS", audio:"kana.mp3",       file:"kana.png" },
    { word:"KANÃ-KU'I",    meaning:"açúcar",         category:"ALIMENTOS", audio:"kana-kui.mp3",   file:"kana-kui.png" },
    { word:"KARÁ",         meaning:"cará",           category:"ALIMENTOS", audio:"kara.mp3",       file:"kara.png" },
    { word:"KUMANDÁ",      meaning:"feijão",         category:"ALIMENTOS", audio:"kumanda.mp3",    file:"kumanda.png" },
    { word:"MANDUWI",      meaning:"amendoim",       category:"ALIMENTOS", audio:"manduwi.mp3",    file:"manduwi.png" },
    { word:"MBA'E'Ũ",      meaning:"café",           category:"ALIMENTOS", audio:"mba-e-u.mp3",    file:"mba-e-u.png" },
    { word:"NHANDY",       meaning:"óleo",           category:"ALIMENTOS", audio:"nhandy.mp3",     file:"nhandy.png" },
    { word:"TADJÁ",        meaning:"inhame",         category:"ALIMENTOS", audio:"tadja.mp3",      file:"tadja.png" },
    { word:"TSAÁ",         meaning:"sal",            category:"ALIMENTOS", audio:"tsaa.mp3",       file:"tsaa.png" },
    { word:"YTSÓ",         meaning:"larva do coqueiro", category:"ALIMENTOS", audio:"ytso.mp3",    file:"ytso.png" },
    { word:"YWYRÁ'Á",      meaning:"fruta",          category:"ALIMENTOS", audio:"ywyra-a.mp3",    file:"ywyra-a.png" },
    { word:"YY RE'Ẽ",      meaning:"suco",           category:"ALIMENTOS", audio:"yy-ree.mp3",     file:"yy-ree.png" },

    // ---------- ANIMAIS ----------
    { word:"PIRÁ",         meaning:"peixe",          category:"ANIMAIS", audio:"pira.mp3",         file:"pira.png" },
    { word:"KATXURU",      meaning:"cachorro",       category:"ANIMAIS", audio:"katxuru.mp3",      file:"katxuru.png" },
    { word:"KA'I",         meaning:"macaco",         category:"ANIMAIS", audio:"kai.mp3",          file:"kai.png" },
    { word:"KAPI'I'UWÁ",   meaning:"capivara",       category:"ANIMAIS", audio:"kapiiuwa.mp3",     file:"kapiiuwa.png" },
    { word:"MBOÍ",         meaning:"cobra",          category:"ANIMAIS", audio:"mboi.mp3",         file:"mboi.png" },
    { word:"NHANDU",       meaning:"aranha",         category:"ANIMAIS", audio:"nhandu.mp3",       file:"nhandu.png" },
    { word:"TAY",          meaning:"formiga",        category:"ANIMAIS", audio:"tay.mp3",          file:"tay.png" },
    { word:"TXIWI",        meaning:"gato",           category:"ANIMAIS", audio:"txiwi.mp3",        file:"txiwi.png" },
    { word:"DJAKARÉ",      meaning:"jacaré",         category:"ANIMAIS", audio:"djakare.mp3",      file:"djakare.png" },
    { word:"TSUGWAI",      meaning:"porco doméstico", category:"ANIMAIS", audio:"tsugwai.mp3",     file:"tsugwai.png" },
    { word:"POPO'I",       meaning:"borboleta",      category:"ANIMAIS", audio:"popoi.mp3",        file:"popoi.png" },
    { word:"KURURU",       meaning:"sapo",           category:"ANIMAIS", audio:"kururu.mp3",       file:"kururu.png" },
    // NOVO — vol. 2, p. 57-59
    { word:"AKUTI",        meaning:"cutia",          category:"ANIMAIS", audio:"akuti.mp3",        file:"akuti.png" },
    { word:"ANDIRÁ",       meaning:"morcego frugívoro", category:"ANIMAIS", audio:"andira.mp3",    file:"andira.png" },
    { word:"ANGUDJÁ",      meaning:"rato",           category:"ANIMAIS", audio:"angudja.mp3",      file:"angudja.png" },
    { word:"DJAGWARETÉ",   meaning:"onça",           category:"ANIMAIS", audio:"djagwarete.mp3",   file:"djagwarete.png" },
    { word:"DJAGWATIRI",   meaning:"jaguatirica",    category:"ANIMAIS", audio:"djagwatiri.mp3",   file:"djagwatiri.png" },
    { word:"DJAITXÁ",      meaning:"paca",           category:"ANIMAIS", audio:"djaitxa.mp3",      file:"djaitxa.png" },
    { word:"GWAIRAKÁ",     meaning:"lontra",         category:"ANIMAIS", audio:"gwairaka.mp3",     file:"gwairaka.png" },
    { word:"GWATSU",       meaning:"veado",          category:"ANIMAIS", audio:"gwatsu.mp3",       file:"gwatsu.png" },
    { word:"IRARA",        meaning:"papa-mel",       category:"ANIMAIS", audio:"irara.mp3",        file:"irara.png" },
    { word:"KAGWARÉ",      meaning:"tamanduá-mirim", category:"ANIMAIS", audio:"kagware.mp3",      file:"kagware.png" },
    { word:"KAITITU",      meaning:"cateto",         category:"ANIMAIS", audio:"kaititu.mp3",      file:"kaititu.png" },
    { word:"KARADJÁ",      meaning:"bugio",          category:"ANIMAIS", audio:"karadja.mp3",      file:"karadja.png" },
    { word:"MBARAKADJÁ",   meaning:"gato do mato",   category:"ANIMAIS", audio:"mbarakadja.mp3",   file:"mbarakadja.png" },
    { word:"MBORÉ",        meaning:"anta",           category:"ANIMAIS", audio:"mbore.mp3",        file:"mbore.png" },
    { word:"MBYKU",        meaning:"gambá",          category:"ANIMAIS", audio:"mbyku.mp3",        file:"mbyku.png" },
    { word:"PEREÁ",        meaning:"preá",           category:"ANIMAIS", audio:"perea.mp3",        file:"perea.png" },
    { word:"TADJATSU",     meaning:"queixada",       category:"ANIMAIS", audio:"tadjatsu.mp3",     file:"tadjatsu.png" },
    { word:"TAĨDJÁ",       meaning:"preguiça",       category:"ANIMAIS", audio:"taidja.mp3",       file:"taidja.png" },
    { word:"TAPITI",       meaning:"lebre",          category:"ANIMAIS", audio:"tapiti.mp3",       file:"tapiti.png" },
    { word:"TATU",         meaning:"tatu",           category:"ANIMAIS", audio:"tatu.mp3",         file:"tatu.png" },
    { word:"TSUTSUARÃ",    meaning:"suçuarana",      category:"ANIMAIS", audio:"tsutsuara.mp3",    file:"tsutsuara.png" },
    { word:"AMBERÉ",       meaning:"lagartixa",      category:"ANIMAIS", audio:"ambere.mp3",       file:"ambere.png" },
    { word:"JABUTI",       meaning:"jabuti",         category:"ANIMAIS", audio:"jabuti.mp3",       file:"jabuti.png" },
    { word:"KARUMBÉ",      meaning:"cágado",         category:"ANIMAIS", audio:"karumbe.mp3",      file:"karumbe.png" },
    { word:"KAWY",         meaning:"vespa/marimbondo", category:"ANIMAIS", audio:"kawy.mp3",       file:"kawy.png" },
    { word:"KY",           meaning:"piolho",         category:"ANIMAIS", audio:"ky.mp3",           file:"ky.png" },
    { word:"KYDJU",        meaning:"grilo",          category:"ANIMAIS", audio:"kydju.mp3",        file:"kydju.png" },
    { word:"MBARIGWI",     meaning:"mosquito",       category:"ANIMAIS", audio:"mbarigwi.mp3",     file:"mbarigwi.png" },
    { word:"MBERU",        meaning:"mosca",          category:"ANIMAIS", audio:"mberu.mp3",        file:"mberu.png" },
    { word:"MUÃ",          meaning:"vagalume",       category:"ANIMAIS", audio:"mua.mp3",          file:"mua.png" },
    { word:"NHAKYRÃ",      meaning:"cigarra",        category:"ANIMAIS", audio:"nhakyra.mp3",      file:"nhakyra.png" },
    { word:"TARAWÉ",       meaning:"barata",         category:"ANIMAIS", audio:"tarawe.mp3",       file:"tarawe.png" },
    { word:"TUKU",         meaning:"gafanhoto",      category:"ANIMAIS", audio:"tuku.mp3",         file:"tuku.png" },

    // ---------- CORES ----------
    { word:"PYNTÃ",        meaning:"vermelho",       category:"CORES", audio:"pynta.mp3",          file:"pynta.png" },
    { word:"IDJU",         meaning:"azul",           category:"CORES", audio:"idju.mp3",           file:"idju.png" },
    { word:"IKYRY",        meaning:"verde",          category:"CORES", audio:"ikyry.mp3",          file:"ikyry.png" },
    { word:"OWY",          meaning:"flor (cor da flor)", category:"CORES", audio:"owy.mp3",        file:"owy.png" },
    { word:"UŨ",           meaning:"preto",          category:"CORES", audio:"uu.mp3",             file:"uu.png" },
    { word:"MORÕTI",       meaning:"branco",         category:"CORES", audio:"moroti.mp3",         file:"moroti.png" },

    // ---------- CORPO ----------
    { word:"AKÃ",          meaning:"cabeça",         category:"CORPO", audio:"aka.mp3",            file:"aka.png" },
    { word:"AWY",          meaning:"cabelo",         category:"CORPO", audio:"awy.mp3",            file:"awy.png" },
    { word:"KUPÉ",         meaning:"costas",         category:"CORPO", audio:"kupe.mp3",           file:"kupe.png" },
    { word:"POAPY",        meaning:"pulso",          category:"CORPO", audio:"poapy.mp3",          file:"poapy.png" },
    { word:"NAMBI",        meaning:"orelha",         category:"CORPO", audio:"nambi.mp3",          file:"nambi.png" },
    { word:"APYTSÃ-KWÁ",   meaning:"ouvido",         category:"CORPO", audio:"apytsangwa.mp3",     file:"apytsangwa.png" },
    { word:"APYTÉ",        meaning:"testa",          category:"CORPO", audio:"apyte.mp3",          file:"apyte.png" },
    { word:"RETSÁ",        meaning:"olho",           category:"CORPO", audio:"retsa.mp3",          file:"retsa.png" },
    { word:"ROWÁ",         meaning:"rosto",          category:"CORPO", audio:"rowa.mp3",           file:"rowa.png" },
    { word:"APYINGWÁ",     meaning:"nariz",          category:"CORPO", audio:"apyingwa.mp3",       file:"apyingwa.png" },
    { word:"DJURU",        meaning:"boca",           category:"CORPO", audio:"djuru.mp3",          file:"djuru.png" },
    { word:"RAĨ",          meaning:"dente",          category:"CORPO", audio:"rai.mp3",            file:"rai.png" },
    { word:"APENKŨ",       meaning:"língua",         category:"CORPO", audio:"apenku.mp3",         file:"apenku.png" },
    { word:"ATI'Y",        meaning:"ombro",          category:"CORPO", audio:"atiy.mp3",           file:"atiy.png" },
    { word:"POTI'Á",       meaning:"peito",          category:"CORPO", audio:"potia.mp3",          file:"potia.png" },
    { word:"PÓ",           meaning:"mão",            category:"CORPO", audio:"po.mp3",             file:"po.png" },
    { word:"KWÃ",          meaning:"dedo da mão",    category:"CORPO", audio:"kwa.mp3",            file:"kwa.png" },
    { word:"RYÉ",          meaning:"barriga",        category:"CORPO", audio:"rye.mp3",            file:"rye.png" },
    { word:"PURU'Ã",       meaning:"umbigo",         category:"CORPO", audio:"purua.mp3",          file:"purua.png" },
    { word:"TYMÃ",         meaning:"perna",          category:"CORPO", audio:"tyma.mp3",           file:"tyma.png" },
    { word:"TÃKÃ",         meaning:"joelho",         category:"CORPO", audio:"taka.mp3",           file:"taka.png" },
    { word:"ADJU'Y",       meaning:"pescoço",        category:"CORPO", audio:"adjuy.mp3",          file:"adjuy.png" },
    { word:"DJYWÁ",        meaning:"braço",          category:"CORPO", audio:"djywa.mp3",          file:"djywa.png" },
    { word:"PY",           meaning:"pé",             category:"CORPO", audio:"py.mp3",             file:"py.png" },
    { word:"PYTSÃ",        meaning:"dedo do pé",     category:"CORPO", audio:"pytsa.mp3",          file:"pytsa.png" },
    // NOVO — vol. 2, p. 41
    { word:"NHE'Ẽ",        meaning:"espírito",       category:"CORPO", audio:"nhe-e.mp3",          file:"nhe-e.png" },
    { word:"REMBÉ",        meaning:"lábio",          category:"CORPO", audio:"rembe.mp3",          file:"rembe.png" },
    { word:"REMBIYTÁ",     meaning:"queixo",         category:"CORPO", audio:"rembiyta.mp3",       file:"rembiyta.png" },
    { word:"KANGWÉ",       meaning:"osso",           category:"CORPO", audio:"kangwe.mp3",         file:"kangwe.png" },
    { word:"RAGWÉ",        meaning:"pelo",           category:"CORPO", audio:"ragwe.mp3",          file:"ragwe.png" },
    { word:"POAPẼ",        meaning:"unha da mão",    category:"CORPO", audio:"poape.mp3",          file:"poape.png" },
    { word:"PYSÃPẼ",       meaning:"unha do pé",     category:"CORPO", audio:"pysape.mp3",         file:"pysape.png" },
    { word:"PYTU'Ũ",       meaning:"cérebro",        category:"CORPO", audio:"pytu-u.mp3",         file:"pytu-u.png" },

    // ---------- PARENTESCO ----------
    { word:"TXETSY",       meaning:"minha mãe",      category:"PARENTESCO", audio:"txetsy.mp3",    file:"txetsy.png" },
    { word:"TXERU",        meaning:"meu pai",        category:"PARENTESCO", audio:"txeru.mp3",     file:"txeru.png" },
    { word:"NHANERAMÕI",   meaning:"nosso avô (incl.)", category:"PARENTESCO", audio:"nhaneramoi.mp3", file:"nhaneramoi.png" },
    { word:"ORERAMÕI",     meaning:"nosso avô (excl.)", category:"PARENTESCO", audio:"oreramoi.mp3", file:"oreramoi.png" },
    { word:"TXERA'Y",      meaning:"meu filho (pai)", category:"PARENTESCO", audio:"txeray.mp3",   file:"txeray.png" },
    { word:"TXEMEMBY",     meaning:"meu filho (mãe)", category:"PARENTESCO", audio:"txememby.mp3", file:"txememby.png" },
    { word:"TXERADJY",     meaning:"minha filha (pai)", category:"PARENTESCO", audio:"txeradjy.mp3", file:"txeradjy.png" },
    { word:"TXERYWY",      meaning:"meu irmão mais novo", category:"PARENTESCO", audio:"txerywy.mp3", file:"txerywy.png" },
    { word:"TXERYKE'Y",    meaning:"meu irmão mais velho", category:"PARENTESCO", audio:"txerykey.mp3", file:"txerykey.png" },
    { word:"TXINDY",       meaning:"minha irmã mais nova", category:"PARENTESCO", audio:"txindy.mp3", file:"txindy.png" },
    { word:"TXEKYPY'Y",    meaning:"minha irmã mais velha", category:"PARENTESCO", audio:"txekypy.mp3", file:"txekypy.png" },
    { word:"TXETUTY",      meaning:"meu tio",        category:"PARENTESCO", audio:"txetuty.mp3",   file:"txetuty.png" },
    { word:"TXETSY'Y",     meaning:"minha tia",      category:"PARENTESCO", audio:"txetsyy.mp3",   file:"txetsyy.png" },
    // NOVO — vol. 2, p. 35-37
    { word:"TXERAPITXÁ",   meaning:"meu amigo/companheiro", category:"PARENTESCO", audio:"txerapitxa.mp3", file:"txerapitxa.png" },
    { word:"TXEIRŨ",       meaning:"meu colega",     category:"PARENTESCO", audio:"txeiru.mp3",    file:"txeiru.png" },
    { word:"TXEMẼ",        meaning:"meu marido",     category:"PARENTESCO", audio:"txeme.mp3",     file:"txeme.png" },
    { word:"TXEREMBIREKÓ", meaning:"minha esposa",   category:"PARENTESCO", audio:"txerembireko.mp3", file:"txerembireko.png" },
    { word:"TXERAMÕI",     meaning:"meu avô",        category:"PARENTESCO", audio:"txeramoi.mp3",  file:"txeramoi.png" },
    { word:"TXETXAÍ",      meaning:"minha avó",      category:"PARENTESCO", audio:"txetxai.mp3",   file:"txetxai.png" },
    { word:"TXERAMAMINÓ",  meaning:"meu neto/neta",  category:"PARENTESCO", audio:"txeramamino.mp3", file:"txeramamino.png" },
    { word:"TXERATYWY",    meaning:"meu sogro",      category:"PARENTESCO", audio:"txeratywy.mp3", file:"txeratywy.png" },
    { word:"TXERA'YTXÓ",   meaning:"minha sogra",    category:"PARENTESCO", audio:"txeraytxo.mp3", file:"txeraytxo.png" },
    { word:"TOWADJÁ",      meaning:"cunhado",        category:"PARENTESCO", audio:"towadja.mp3",   file:"towadja.png" },
    { word:"TSANGÁ",       meaning:"madrinha",       category:"PARENTESCO", audio:"tsanga.mp3",    file:"tsanga.png" },

    // ---------- NATUREZA (NOVO) ----------
    { word:"KWARAY",       meaning:"sol",            category:"NATUREZA", audio:"kwaray.mp3",      file:"kwaray.png" },
    { word:"JASY",         meaning:"lua",            category:"NATUREZA", audio:"jasy.mp3",        file:"jasy.png" },
    { word:"TATÁ",         meaning:"fogo",           category:"NATUREZA", audio:"tata.mp3",        file:"tata.png" },
    { word:"YY",           meaning:"água",           category:"NATUREZA", audio:"yy.mp3",          file:"yy.png" },
    { word:"YBY",          meaning:"terra, chão",    category:"NATUREZA", audio:"yby.mp3",         file:"yby.png" },
    { word:"OKY",          meaning:"chuva",          category:"NATUREZA", audio:"oky.mp3",         file:"oky.png" },
    { word:"YWYRÁ",        meaning:"árvore",         category:"NATUREZA", audio:"ywyra.mp3",       file:"ywyra.png" },
    { word:"YYWYRU",       meaning:"vento",          category:"NATUREZA", audio:"yywyru.mp3",      file:"yywyru.png" },
    { word:"YWYTY",        meaning:"serra",          category:"NATUREZA", audio:"ywyty.mp3",       file:"ywyty.png" },

    // ---------- GEOGRAFIA (NOVO) ----------
    { word:"PARANÁ",       meaning:"rio",            category:"GEOGRAFIA", audio:"parana.mp3",     file:"parana.png" },
    { word:"PARAGWATSU",   meaning:"mar, oceano",    category:"GEOGRAFIA", audio:"paragwatsu.mp3", file:"paragwatsu.png" },
    { word:"YY KWÁ",       meaning:"lago",           category:"GEOGRAFIA", audio:"yy-kwa.mp3",     file:"yy-kwa.png" },
    { word:"YY KWÁTY",     meaning:"lagoa",          category:"GEOGRAFIA", audio:"yy-kwaty.mp3",   file:"yy-kwaty.png" },
    { word:"YY AKÃ",       meaning:"cachoeira",      category:"GEOGRAFIA", audio:"yy-aka.mp3",     file:"yy-aka.png" },
    { word:"KA'AGWY",      meaning:"mata",           category:"GEOGRAFIA", audio:"ka-agwy.mp3",    file:"ka-agwy.png" },
    { word:"TAPÉ",         meaning:"estrada",        category:"GEOGRAFIA", audio:"tape.mp3",       file:"tape.png" },
    { word:"OKÁ RUTSU",    meaning:"campo",          category:"GEOGRAFIA", audio:"oka-rutsu.mp3",  file:"oka-rutsu.png" },
    { word:"OKÁ PY",       meaning:"fora",           category:"GEOGRAFIA", audio:"oka-py.mp3",     file:"oka-py.png" },
    { word:"IWI",          meaning:"chão, terra",    category:"GEOGRAFIA", audio:"iwi.mp3",        file:"iwi.png" },

    // ---------- SAUDAÇÕES (NOVO) ----------
    { word:"ARY PORÃ",     meaning:"bom dia",        category:"SAUDAÇÕES", audio:"ary-pora.mp3",   file:"ary-pora.png" },
    { word:"KA'ARU PORÃ",  meaning:"boa tarde",      category:"SAUDAÇÕES", audio:"kaaru-pora.mp3", file:"kaaru-pora.png" },
    { word:"PYNTŨ PORÃ",   meaning:"boa noite",      category:"SAUDAÇÕES", audio:"pyntu-pora.mp3", file:"pyntu-pora.png" },
    { word:"ADJIWYMA",     meaning:"tchau",          category:"SAUDAÇÕES", audio:"adjiwyma.mp3",   file:"adjiwyma.png" },
    { word:"NDERA'EWÉ",    meaning:"tudo bem?",      category:"SAUDAÇÕES", audio:"nderaewe.mp3",   file:"nderaewe.png" },
    { word:"PEMAẼ PORÃ",   meaning:"bem-vindos",     category:"SAUDAÇÕES", audio:"pemae-pora.mp3", file:"pemae-pora.png" },

    // ---------- ADVÉRBIOS ----------
    // (sem file — palavra abstrata; só áudio da pronúncia)
    { word:"WEI",           meaning:"bem, bastante",     category:"ADVÉRBIOS", audio:"wei.mp3" },
    { word:"ARIENTÉ",       meaning:"bastante",          category:"ADVÉRBIOS", audio:"ariente.mp3" },
    { word:"ETÉ",           meaning:"muito",             category:"ADVÉRBIOS", audio:"ete.mp3" },
    { word:"MBARIÍ",        meaning:"pouco",             category:"ADVÉRBIOS", audio:"mbarii.mp3" },
    { word:"MBENGWÉ",       meaning:"devagar",           category:"ADVÉRBIOS", audio:"mbengwe.mp3" },
    { word:"MBENGWE'I",     meaning:"lentamente",        category:"ADVÉRBIOS", audio:"mbengwei.mp3" },
    { word:"PETEREMÉ",      meaning:"rápido",            category:"ADVÉRBIOS", audio:"petereme.mp3" },
    { word:"WOÍ",           meaning:"rapidamente",       category:"ADVÉRBIOS", audio:"woi.mp3" },
    { word:"PÁ",            meaning:"completamente",     category:"ADVÉRBIOS", audio:"pa.mp3" },
    { word:"TENGWÁ",        meaning:"certamente",        category:"ADVÉRBIOS", audio:"tengwa.mp3" },
    { word:"RAMĨ",          meaning:"talvez",            category:"ADVÉRBIOS", audio:"rami.mp3" },
    { word:"DJIWY",         meaning:"novamente",         category:"ADVÉRBIOS", audio:"djiwy.mp3" },
    { word:"YMÃ",           meaning:"antigamente",       category:"ADVÉRBIOS", audio:"yma.mp3" },
    { word:"KWEÉ",          meaning:"ontem",             category:"ADVÉRBIOS", audio:"kwee.mp3" },
    { word:"KO'AỸ",         meaning:"hoje",              category:"ADVÉRBIOS", audio:"ko-ay.mp3" },
    { word:"KO'ẼRO",        meaning:"amanhã",            category:"ADVÉRBIOS", audio:"ko-ero.mp3" },
    { word:"KO'Ẽ",          meaning:"cedo, manhã",       category:"ADVÉRBIOS", audio:"ko-e.mp3" },
    { word:"RIRÉ",          meaning:"depois de",         category:"ADVÉRBIOS", audio:"rire.mp3" },
    { word:"TERI",          meaning:"ainda",             category:"ADVÉRBIOS", audio:"teri.mp3" },
    { word:"MOMBYRY",       meaning:"longe",             category:"ADVÉRBIOS", audio:"mombyry.mp3" },
    { word:"DJAWÉ",         meaning:"perto",             category:"ADVÉRBIOS", audio:"djawe.mp3" },
    { word:"PY-PY",         meaning:"dentro",            category:"ADVÉRBIOS", audio:"py-py.mp3" },
    { word:"OKÁ-PY",        meaning:"fora",              category:"ADVÉRBIOS", audio:"oka-py.mp3" },
    { word:"UPÉ-PY",        meaning:"ali, lá",           category:"ADVÉRBIOS", audio:"upe-py.mp3" }
];


/* =========================================================
   4. ESTADO DO JOGO
   ========================================================= */

const state = {
    index: 0,
    score: 0,
    fase: 1,
    answered: false,
    sound: true,
    time: null,
    questions: [],
    salvar: true
};

const $ = id => document.getElementById(id);


/* =========================================================
   4-B. PROGRESSO PERSISTENTE (localStorage)
   ========================================================= */

const SAVE_KEY = "tape-rupi-progresso";
const SAVE_VERSION = 1;

const FASES_INFO = {
    1: { nome: "Fase 1", nivel: "Fácil",   icone: "🌱" },
    2: { nome: "Fase 2", nivel: "Médio",   icone: "🌿" },
    3: { nome: "Fase 3", nivel: "Difícil", icone: "🌳" },
    4: { nome: "Fase 4", nivel: "Avançado",icone: "⭐" }
};

function lerProgresso() {
    try {
        const bruto = localStorage.getItem(SAVE_KEY);
        if (!bruto) return null;
        const dados = JSON.parse(bruto);
        if (!dados || dados.v !== SAVE_VERSION) return null;
        if (typeof dados.fase !== "number") return null;
        if (typeof dados.index !== "number") return null;
        if (typeof dados.score !== "number") return null;
        return dados;
    } catch (e) { return null; }
}

function salvarProgresso() {
    if (!state.salvar) return;
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
            v: SAVE_VERSION,
            fase: state.fase,
            index: state.index,
            score: state.score,
            data: new Date().toISOString()
        }));
    } catch (e) {
        console.warn("[save] erro:", e);
    }
}

function apagarProgresso() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}

function faseDesbloqueada(n) {
    if (n === 1) return true;
    const p = lerProgresso();
    if (!p) return false;
    // qualquer fase <= (última fase concluída + 1) está liberada
    if (typeof p.concluidas !== "number") return n <= 1;
    return n <= p.concluidas + 1;
}

function registrarConclusao(fase) {
    try {
        const p = lerProgresso() || { v: SAVE_VERSION, concluidas: 0 };
        if (typeof p.concluidas !== "number") p.concluidas = 0;
        p.concluidas = Math.max(p.concluidas, fase);
        p.v = SAVE_VERSION;
        p.data = new Date().toISOString();
        // dados de posição zerados: ao voltar, o jogador escolhe a fase
        p.fase = fase + 1 <= 4 ? fase + 1 : fase;
        p.index = 0;
        p.score = 0;
        localStorage.setItem(SAVE_KEY, JSON.stringify(p));
    } catch (e) {}
}


/* =========================================================
   5. PERÍODO DO DIA
   ========================================================= */

function periodNow() {

    const h = new Date().getHours();

    if (h >= 5 && h < 12) {
        return {
            name: "Manhã",
            icon: "☀",
            title: "Ko´ẽ Porã!",
            desc: "A luz da manhã abre o caminho para novas descobertas.",
            msg: "A jornada começa com a luz do dia."
        };
    }

    if (h >= 12 && h < 18) {
        return {
            name: "Tarde",
            icon: "◉",
            title: "Ka´aru Porã!",
            desc: "O caminho continua. Observe cada detalhe e descubra.",
            msg: "A tarde convida a explorar."
        };
    }

    return {
        name: "Noite",
        icon: "☾",
        title: "Pỹtũ Porã!",
        desc: "Quando a noite chega, a atenção ilumina o caminho.",
        msg: "A noite também guarda descobertas."
    };
}


/* =========================================================
   6. NAVEGAÇÃO ENTRE TELAS
   ========================================================= */

function screen(id) {
    ["home", "game", "finish"].forEach(x => {
        $(x).classList.toggle("active", x === id);
    });
    if (id === "home") {
        atualizarSeletorFase();
        atualizarBotaoContinuar();
    }
}


/* =========================================================
   7. ÁUDIO
   ========================================================= */

function audio(file) {
    if (!state.sound || !file) return;
    const a = new Audio(ASSET.audio + file);
    a.volume = 0.85;
    a.play().catch(() => {});
}


/* =========================================================
   8. FUNÇÕES AUXILIARES
   ========================================================= */

function shuffle(a) {
    return [...a].sort(() => Math.random() - 0.5);
}

function pickThree(item, list) {
    const others = shuffle(
        list.filter(x => x.word !== item.word)
    ).slice(0, 2);
    return shuffle([item, ...others]);
}

function word(w) {
    return VOCABULARY.find(v => v.word === w);
}

function numberWord(n) {
    return NUMBER_VOCABULARY.find(v => v.value === n);
}


/* =========================================================
   9. CRIAÇÃO DAS PERGUNTAS DA FASE 1
   ========================================================= */

function buildQuestions() {

    const qs = [];

    const firstItem = VOCABULARY.find(v => v.word === "ADJAKÁ");
    if (!firstItem) throw new Error("A palavra ADJAKÁ não foi encontrada.");

    const objectGroup = VOCABULARY.filter(v => v.category === "OBJETOS");

    const firstQuestion = {
        type: "word",
        kind: "OBJETOS",
        prompt: "Como se diz cesto na língua Nhandewa?",
        hint: "Observe a figura e escolha a palavra correta.",
        target: "ADJAKÁ",
        choices: pickThree(firstItem, objectGroup).map(x => x.word)
    };

    ["CORES","ANIMAIS","CORPO","PARENTESCO","OBJETOS","ALIMENTOS"].forEach(cat => {

        let group = VOCABULARY.filter(v => v.category === cat);
        if (cat === "OBJETOS") group = group.filter(v => v.word !== "ADJAKÁ");

        const quantidade =
            cat === "CORPO" ? 5 :
            cat === "ANIMAIS" ? 5 :
            cat === "PARENTESCO" ? 4 : 3;

        shuffle(group).slice(0, quantidade).forEach(item => {
            const opts = pickThree(item, group);
            qs.push({
                type: "word",
                kind: cat,
                prompt: "Como se diz isto na língua Nhandewa?",
                hint: "Observe a imagem e escolha a palavra correspondente.",
                target: item.word,
                choices: opts.map(x => x.word)
            });
        });
    });

    const numerosValidos = NUMBER_VOCABULARY.filter(
        n => n.word && n.word !== "..."
    );

    shuffle(numerosValidos).slice(0, 4).forEach(n => {
        const opts = shuffle(
            numerosValidos.filter(x => Math.abs(x.value - n.value) <= 2)
        ).slice(0, 3);

        if (!opts.some(x => x.value === n.value)) opts[0] = n;

        qs.push({
            type: "number",
            kind: "NÚMEROS",
            prompt: "Qual é a palavra Nhandewa para este número?",
            hint: "Observe o algarismo e escolha a forma correspondente.",
            target: n.value,
            choices: shuffle(opts).map(x => x.value)
        });
    });

    const animalSet = VOCABULARY.filter(
        v => v.category === "ANIMAIS" && v.file
    );

    [0,1,2,3,4,5,6,7].forEach(n => {
        const opts = shuffle(
            numerosValidos.filter(x => Math.abs(x.value - n) <= 2)
        ).slice(0, 3);

        if (!opts.some(x => x.value === n)) {
            opts[0] = NUMBER_VOCABULARY.find(x => x.value === n);
        }

        const selectedAnimal = animalSet[
            Math.floor(Math.random() * animalSet.length)
        ];

        qs.push({
            type: "count",
            kind: "CONTE E DESCUBRA",
            prompt: "Quantos animais aparecem nesta imagem?",
            hint: "Conte cada figura uma vez e escolha a palavra do número.",
            target: n,
            countItem: selectedAnimal,
            choices: shuffle(opts).map(x => x.value)
        });
    });

    return [firstQuestion, ...shuffle(qs)];
}


/* =========================================================
   10. INICIAR JORNADA
   ========================================================= */

function construirPerguntasDaFase(fase) {
    if (fase === 1) return buildQuestions();
    if (fase === 2 && window.FASE2) return window.FASE2.buildQuestions();
    if (fase === 3 && window.FASE3) return window.FASE3.buildQuestions();
    if (fase === 4 && window.FASE4) return window.FASE4.buildQuestions();
    return buildQuestions();
}

function start(fase) {

    const alvo = fase || 1;

    if (!faseDesbloqueada(alvo)) {
        console.warn("[start] fase", alvo, "bloqueada.");
        return;
    }

    state.index = 0;
    state.score = 0;
    state.fase = alvo;
    state.time = periodNow();
    state.questions = construirPerguntasDaFase(alvo);

    $("time-chip").textContent =
        "FASE " + state.fase + " · " + state.time.name.toUpperCase();
    $("period-label").textContent =
        "FASE " + state.fase + " · " + (FASES_INFO[state.fase]?.nivel || "");
    $("greeting").textContent = state.time.title;
    $("period-desc").textContent = state.time.desc;
    $("period-icon").textContent = state.time.icon;
    $("period-name").textContent = state.time.name;
    $("period-message").textContent = state.time.msg;

    screen("game");
    salvarProgresso();
    render();
}

function continuarSalvo() {

    const p = lerProgresso();
    if (!p) { start(1); return; }

    const fase = Math.min(Math.max(p.fase || 1, 1), 4);
    const idx = Math.max(0, p.index | 0);
    const pts = Math.max(0, p.score | 0);

    state.fase = fase;
    state.score = pts;
    state.index = 0; // reconstrói a fila, mas mantém pontuação
    state.time = periodNow();
    state.questions = construirPerguntasDaFase(fase);

    // tenta ir direto ao desafio salvo (se caber no tamanho atual)
    if (idx < state.questions.length) state.index = idx;

    $("time-chip").textContent =
        "FASE " + state.fase + " · " + state.time.name.toUpperCase();
    $("period-label").textContent =
        "FASE " + state.fase + " · " + (FASES_INFO[state.fase]?.nivel || "");
    $("greeting").textContent = state.time.title;
    $("period-desc").textContent = state.time.desc;
    $("period-icon").textContent = state.time.icon;
    $("period-name").textContent = state.time.name;
    $("period-message").textContent = state.time.msg;

    screen("game");
    render();
}


/* =========================================================
   11. CARREGAMENTO DE IMAGENS
   ========================================================= */

function createImage(item, className = "question-image") {

    const img = document.createElement("img");
    img.className = className;
    img.alt = item.meaning || "Imagem do vocabulário Nhandewa";
    img.onerror = function() {
        const warning = document.createElement("span");
        warning.className = "image-missing";
        warning.textContent =
            "Imagem ausente: " + (item.file || "arquivo não informado");
        this.replaceWith(warning);
    };
    img.src = getImagePath(item);
    return img;
}


/* =========================================================
   12. ATUALIZAR TELA
   ========================================================= */

function render() {

    const q = state.questions[state.index];
    state.answered = false;

    $("qnum").textContent =
        "DESAFIO " + String(state.index + 1).padStart(2, "0");

    $("qkind").textContent = q.kind;
    $("prompt").textContent = q.prompt;
    $("hint").textContent = q.hint;

    $("progress-text").textContent =
        `${state.index + 1} / ${state.questions.length}`;

    $("progress-fill").style.width =
        (state.index / state.questions.length * 100) + "%";

    $("score").textContent = state.score;

    $("stars").textContent =
        state.score >= 180 ? "★ ★ ★" :
        state.score >= 100 ? "★ ★ ☆" :
        state.score >= 40 ? "★ ☆ ☆" : "☆ ☆ ☆";

    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("next").disabled = true;

    $("next").textContent =
        state.index === state.questions.length - 1
        ? "VER RESULTADO →"
        : "PRÓXIMO DESAFIO →";

    visual(q);
    answers(q);
}


/* =========================================================
   13. VISUAL — IMAGENS + FALLBACK
   ========================================================= */

function visual(q) {

    const box = $("visual");
    box.innerHTML = "";
    box.classList.remove("number-mode");

    $("listen").disabled = true;
    $("listen").onclick = null;

    if (q.type === "word" || q.type === "word-new") {
        const item = word(q.target);
        if (!item) {
            const note = document.createElement("span");
            note.className = "visual-note";
            note.textContent = "PALAVRA NOVA";
            box.append(note);
            return;
        }

        const card = document.createElement("div");
        card.className = "visual-card";

        const label = document.createElement("span");
        label.className = "visual-label";
        label.textContent = "OBSERVE A IMAGEM";

        card.append(createImage(item, "visual-image"), label);
        box.append(card);

        $("listen").disabled = false;
        $("listen").onclick = () => audio(item.audio);
    }

    else if (q.type === "number") {
        box.classList.add("number-mode");
        const card = document.createElement("div");
        card.className = "visual-card number-card";

        const n = document.createElement("span");
        n.className = "number-visual";
        n.textContent = String(q.target);

        const lab = document.createElement("span");
        lab.className = "visual-label";
        lab.textContent = "NÚMERO";

        card.append(n, lab);
        box.append(card);

        const item = numberWord(q.target);
        if (item && item.word !== "...") {
            $("listen").disabled = false;
            $("listen").onclick = () => audio(item.audio);
        }
    }

    else if (q.type === "count") {
        const wrap = document.createElement("div");
        wrap.className = "visual-count";

        if (q.target === 0) {
            const empty = document.createElement("span");
            empty.className = "visual-note";
            empty.textContent = "NENHUM ANIMAL";
            wrap.append(empty);
        } else {
            for (let i = 0; i < q.target; i++) {
                const img = createImage(q.countItem, "count-animal-image");
                img.alt = "Animal " + (i + 1);
                wrap.append(img);
            }
        }

        box.append(wrap);

        const note = document.createElement("span");
        note.className = "visual-note";
        note.textContent = q.target === 0
            ? "OBSERVE A IMAGEM"
            : "CONTE AS FIGURAS";
        box.append(note);
    }
}


/* =========================================================
   14. ALTERNATIVAS
   ========================================================= */

function answers(q) {

    const box = $("answers");
    box.innerHTML = "";

    q.choices.forEach(v => {
        const b = document.createElement("button");
        b.className = "answer";
        b.type = "button";
        b.dataset.value = String(v);

        if (q.type === "word" || q.type === "word-new") {
            b.textContent = v;
        } else {
            const n = numberWord(v);
            b.textContent = n ? n.word : String(v);
        }

        b.addEventListener("click", () => check(v, b));
        box.append(b);
    });
}


/* =========================================================
   15. CORREÇÃO
   ========================================================= */

function check(value, button) {

    if (state.answered) return;

    const q = state.questions[state.index];
    const ok = value === q.target;

    state.answered = true;

    document.querySelectorAll(".answer").forEach(b => b.disabled = true);

    if (ok) {
        state.score += 10;
        button.classList.add("correct");
        $("feedback").textContent = "AGUYJEVETE! Você encontrou a resposta.";
        $("feedback").className = "feedback";

        if (window.som) window.som.acerto();

        const item = (q.type === "word" || q.type === "word-new")
            ? word(q.target) : null;

        if (item) audio(item.audio);
        else if (q.type === "number" || q.type === "count") {
            const n = numberWord(q.target);
            if (n && n.word !== "...") audio(n.audio);
        }
    } else {
        button.classList.add("wrong");
        const right = [...document.querySelectorAll(".answer")]
            .find(b => b.dataset.value === String(q.target));
        if (right) right.classList.add("correct");

        $("feedback").textContent =
            "Ainda não! Observe novamente. A resposta certa está destacada.";
        $("feedback").className = "feedback error";

        if (window.som) window.som.erro();
    }

    $("score").textContent = state.score;

    $("stars").textContent =
        state.score >= 180 ? "★ ★ ★" :
        state.score >= 100 ? "★ ★ ☆" :
        state.score >= 40 ? "★ ☆ ☆" : "☆ ☆ ☆";

    $("next").disabled = false;
    salvarProgresso();
}


/* =========================================================
   16. PRÓXIMO DESAFIO
   ========================================================= */

function next() {

    if (!state.answered) return;

    if (state.index < state.questions.length - 1) {
        state.index++;
        salvarProgresso();
        render();
        return;
    }

    // fim de fase
    registrarConclusao(state.fase);

    if (state.fase === 1 && window.FASE2) { start(2); return; }
    if (state.fase === 2 && window.FASE3) { start(3); return; }
    if (state.fase === 3 && window.FASE4) { start(4); return; }

    finish();
}


/* =========================================================
   17. FINAL DA JORNADA
   ========================================================= */

function finish() {

    $("progress-fill").style.width = "100%";
    $("final-score").textContent = state.score;

    $("finish-message").textContent =
        state.time.title +
        " Você completou esta fase com " +
        state.score +
        " pontos. Escolha outra fase ou comece uma nova jornada.";

    $("time-chip").textContent = "FASE CONCLUÍDA";

    if (window.som) window.som.acerto();

    // libera próxima fase, limpa posição da atual
    registrarConclusao(state.fase);
    apagarProgresso();

    screen("finish");
}


/* =========================================================
   18. SELETOR DE FASE NA TELA INICIAL
   ========================================================= */

function atualizarSeletorFase() {

    const box = document.getElementById("fase-botoes");
    if (!box) return;

    box.innerHTML = "";

    [1, 2, 3, 4].forEach(n => {

        const info = FASES_INFO[n];
        const liberada = faseDesbloqueada(n);
        const btn = document.createElement("button");

        btn.type = "button";
        btn.className = "fase-btn";
        btn.dataset.fase = String(n);

        if (!liberada) {
            btn.disabled = true;
            btn.title = "Conclua a fase anterior para liberar";
        }

        btn.innerHTML =
            "<span>" + info.icone + " " + info.nome + "</span>" +
            "<small>" + info.nivel + "</small>";

        btn.addEventListener("click", function () {
            if (btn.disabled) return;
            start(n);
        });

        box.append(btn);
    });
}


/* =========================================================
   19. BOTÃO "CONTINUAR"
   ========================================================= */

function atualizarBotaoContinuar() {

    const botao = document.getElementById("continue");
    if (!botao) return;

    const p = lerProgresso();

    // sem progresso salvo de posição, esconde
    if (!p || typeof p.fase !== "number" || typeof p.index !== "number") {
        botao.style.display = "none";
        return;
    }
    if (p.score === 0 && p.index === 0) {
        botao.style.display = "none";
        return;
    }

    botao.style.display = "";

    const fase = Math.min(Math.max(p.fase, 1), 4);
    const info = FASES_INFO[fase];
    const data = p.data ? new Date(p.data) : null;
    const quando = data
        ? data.toLocaleDateString("pt-BR") + " · " +
          data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        : "";

    botao.textContent =
        "CONTINUAR · " + info.icone + " " + info.nome +
        " · DESAFIO " + (p.index + 1) +
        " · " + p.score + " PTS" +
        (quando ? " · " + quando : "");
}


/* =========================================================
   20. BOTÕES E EVENTOS
   ========================================================= */

$("start").addEventListener("click", function () {
    // "Começar" volta sempre para a fase 1 e zera o progresso de posição
    state.salvar = true;
    apagarProgresso();
    start(1);
});

$("again").addEventListener("click", function () {
    apagarProgresso();
    start(1);
});

$("next").addEventListener("click", next);

$("home-button").addEventListener("click", function () {
    $("time-chip").textContent =
        "JORNADA DA " + periodNow().name.toUpperCase();
    screen("home");
});

$("sound").addEventListener("click", function () {
    state.sound = !state.sound;
    $("sound").textContent = state.sound ? "♫" : "♪̸";
    $("sound").setAttribute(
        "aria-label",
        state.sound ? "Desativar sons" : "Ativar sons"
    );
});

document.getElementById("continue")?.addEventListener("click", continuarSalvo);


/* =========================================================
   21. BOOT
   ========================================================= */

(function () {
    const p = periodNow();
    $("time-chip").textContent =
        "JORNADA DA " + p.name.toUpperCase();

    atualizarSeletorFase();
    atualizarBotaoContinuar();
})();
