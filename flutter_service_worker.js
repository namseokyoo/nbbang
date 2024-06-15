'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "8011171cbd06e99518cff80b5c815761",
"index.html": "c695122ce41698de5e8751c94adc6fb1",
"/": "c695122ce41698de5e8751c94adc6fb1",
"CNAME": "2bd5ddb1d74804b7b1ff086e3d7a8165",
"main.dart.js": "c45db06fae069c28f882e1948c993efd",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
".git/ORIG_HEAD": "c604dd3e5609677e5c1281090ad79d69",
".git/config": "e29d3eac2dfed27548f630f7c435d55e",
".git/objects/0d/42e4324a8d24a203d25931de65db12b22b4983": "f9ff42fbfc4570c6646e8830fdcb1a34",
".git/objects/95/0a788d311dcfe1449ba4e8f54d12077267819b": "1b17b07c5e22ec27f7b0293c352c81b4",
".git/objects/95/582d16ed8f3e8c4f3e5bc012c7769ae6f8fb44": "48b0f2d05c7e0a42d39fe6d492fa308b",
".git/objects/95/9fe7e5d5912623b40a91eea62fbd81218e695a": "e340403d116ffc83c6a7bf4b8bc70475",
".git/objects/92/33d367e15f3ab6f80791d34938b62de03f8b0b": "5ac7b0d142d39ea424b664293d795e74",
".git/objects/66/3023a9c6796361486a54a7641fd80769ec5914": "81d22f775a77fb8079f721db348536df",
".git/objects/50/10be1e9df9606fd92d88d253a2edfeb39da76b": "21c960eae6ad785ecb81a6c24aca8126",
".git/objects/50/c3ae1b25fc10e9b97f1bcbae82f46017380138": "76d08173e4f50da06294a0b16c8edee6",
".git/objects/03/060f8d84e3afe780942b16867e7cd1d012ac21": "9ee4586c4e74ed20f52e49acc15b2e80",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/9b/61920a5cb5a812654e9596c1a50961ee0b840a": "f94d5dbcc9b47d375b9bd6da203dd9dd",
".git/objects/04/e5efc15dc0c60ea2ffcc37c5bf25e96689f44d": "978222f47488835b92838c74cb5c684c",
".git/objects/32/5e56e6c232f8efa865256467bd094105ae74cf": "8a36840aeaea01689180e175aed28d43",
".git/objects/69/dd618354fa4dade8a26e0fd18f5e87dd079236": "8cc17911af57a5f6dc0b9ee255bb1a93",
".git/objects/56/b73e77c0e3f29deeab1b6a4874418153842d26": "9fd4b97a4680f09761b583e39a4b8452",
".git/objects/94/b52e13bf7919ae4ea7235d78019b592dde8611": "b79fa5ca1cdbf72f253763797850f314",
".git/objects/0e/e3590f4d74c3a4e4621a8d048d01f13436ec7a": "25939fd9f3cb53628d90cf3f4f9a026a",
".git/objects/60/cc2a5975f10c7fc5debd182412815c7e4fd315": "b28fd0e407ee8b5b15cb866a79fa4f0d",
".git/objects/34/caa3e684965acaa4f6fc0bd963d607efc2fde0": "2fbd2b9ffa7e3f755ed5b62bf49636c9",
".git/objects/5a/129f27d7174108d210352b2f7fa4be947b9b82": "a24349f5e3d81b7a40f318dd0c202b22",
".git/objects/5f/fb88c1d97b2e20fccbf392363379150c950284": "fb094c41387bcc12b4984eee1b0f9cba",
".git/objects/33/9cfa4673f9f9ff6774bae9249104a4628031bd": "e90f48a20c1074a3336717f2d7548533",
".git/objects/05/bc89fa8144eb5d973856c70ac9f03defedf034": "2cb4422effcd6c399ec57e7fa41473ae",
".git/objects/05/a234ad98735da748f386d34334197cbf38ff3d": "c69f07a1d9c3bbdc394918526b97b6b2",
".git/objects/02/53761e9be942ecb138c399786be18e5efcf594": "f52550d5bd8a73375bf35fbade3b7976",
".git/objects/a3/f91bbe56ce894b7ca6679387c02ba7d30f7bd0": "49b110e57b6ebc1214baa8de1e9a3d41",
".git/objects/ad/8b32bdadd672f7b96397a97965424ef57bd1dc": "dc5bb6387dce500b71702070098d5677",
".git/objects/bb/3085876799532613a08c7ebe43f24f0cc46864": "1b6aa21800d948d5513c15e54d131215",
".git/objects/da/bec39047e16c84f50403b0f62ea78ba1f45218": "9e319d3eca5b415e1f7133555d8ffb87",
".git/objects/b4/41a4ee865330df4f96cbe382c695acdacb0430": "6befa7c9e663a4cd1ee8d184dd49c76e",
".git/objects/a2/6af96074c99ae013ab02a651f849d109fcc36c": "0dd58bf72f4619f44ba20156eb9eadc7",
".git/objects/a5/d0486fd1f6a92605752bcaad4170cb68fe7c79": "9fc21c12a6b793e30982960c51f4f8c3",
".git/objects/bd/33267d8240bfc70b7953d452f09d840e793aff": "f3c9626980a96feef5dcd1953441a922",
".git/objects/bc/c4aa00d64be864c3d65d2d3c1f8d1079e80f06": "be315280e70abf4c8f4f39c5ae679acf",
".git/objects/bc/2698b05b52479cee8118bf5eb5ce2728610610": "b4fbaeafcc1b95687f4d7e810697860f",
".git/objects/bc/274ba84ef1fdedfe1fc1e77f36ea369c17e658": "a53ca5fa8b3aa402ad63642f4ea4cee4",
".git/objects/ae/13865f6faa6d9c70798878247cb10c873408b7": "816a354a21b71749f85a23a9813c16bc",
".git/objects/ae/670b6054f24be5ba07f3bc72d1edc0122b31fb": "bc02a3befeeb7165c9a47cebcac6bb70",
".git/objects/d8/8da1f1d73fe2ed75b5a44c8ef212ce93ff153c": "97965efb589d8ac4ad88dca2362536e7",
".git/objects/e5/69a68b4fcc135a191e52f79a1c840d45ccf107": "95b5bb8b84b2c7185b942ecb8920b770",
".git/objects/f4/5a7fd6f327cf05f599a4088d053ab051592367": "c5b93e00e541355d0b772d6293e54108",
".git/objects/f4/825676a3156dc364fcd324bd72fac924967445": "cd7b7855c1961fe1439332dd030f8c81",
".git/objects/eb/ac8f6ba758a8d8eab777e355982c3869715f3f": "1f10172f4c5e8cdb118a6ba1b54c5589",
".git/objects/c9/25af1e8ccd08219359134373ebffaf5738a932": "673668fff48507eac34ff156f82a3969",
".git/objects/fc/b06457b0a190fcb4e429525d321bd064a52b12": "8f77c946228aa07762e5580b913ac259",
".git/objects/fc/287694eaac9e354c98c1b62042c01e429a4ec6": "7b555dc16bf6e2e41a3139b710089d12",
".git/objects/f2/400c0839f0b0540b6591be96f4670ba0e2123b": "02893fc55066783337a4132b2ff5612e",
".git/objects/e3/ad419f3e0a476cda3167dd5330b439c5acc82a": "4bde229c6e22e7b21e0092b554738685",
".git/objects/c8/6be2621afacaa744de3a60b47a36f06e5e7527": "ec09ac5d18d489e47c5334b1e5515d0f",
".git/objects/fb/e2250f1458e3da8ac1bb3fcbc9cf4b54172163": "7fc2bbf1710f869f04b6cb9511931dbb",
".git/objects/ec/0cb57fddbd019087a51036380a30602a8ca0a9": "6610a4d5cf18f6e2b76e436681be38e1",
".git/objects/4e/3545aeb7e29d30f6e20c32a6945122ee8ef6e6": "548d030d72b3ff0d83059f4aa125c33a",
".git/objects/4e/ce63d05f059488382ea710559cae42e712a162": "cc2df8d3a99832245dd8d76e43effef2",
".git/objects/20/1afe538261bd7f9a38bed0524669398070d046": "82a4d6c731c1d8cdc48bce3ab3c11172",
".git/objects/27/734b923f388ddb6f8bf9f12e2462cd93a60dc6": "ab1989436c6c9a24cf8f56e572ec7b4c",
".git/objects/4b/08c92a6448f807045994c6de22d8ee9093aaab": "73d0aae290bed3c22142aa1a7a3ba56f",
".git/objects/7c/edb5790b234e41f15220f197bff44412c52762": "50d30b169a024a3b59cf06a32ceec134",
".git/objects/1f/1ee4c2d0313ffca33121aefd9e32cbe8fa4884": "e77986c4344e7e2db86da48c52c23662",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/1f/7618e8980d07f3aaddd52dc5318088aa8d236b": "ec738405e0712b9cbbc626892cd45b65",
".git/objects/74/4b232a89aa94af63a6e2bea9efb418aeaf2c38": "12c0899abbf901bb483944b25946f0fc",
".git/objects/17/bf937c506d5c9f5d3e50df080fdf496dab85bd": "8b8a0e9c4c5612b89b7a0a276c719011",
".git/objects/7b/fcd3c49856362dd92356b99d4bb6c8a0a982f1": "5237346cacb0aaaca83e076fb364e3f3",
".git/objects/8f/e7af5a3e840b75b70e59c3ffda1b58e84a5a1c": "e3695ae5742d7e56a9c696f82745288d",
".git/objects/7e/47c4365e3af187c262baa603d7fcdf7bc81ff4": "6c97a278d9558820780825483710f416",
".git/objects/7e/83b4ef87678ec39d70ea311ae84aa4a1b547c1": "f31bbba9db90905912a524fab5a350e3",
".git/objects/7e/e51842c9c70e5141c785a9727f4227fcd6a91b": "dfbea0d4709704a640737ea344f367bd",
".git/objects/19/d0b5fb53b19cefba369e3110fb2d3656afbb60": "a641c818584911339a5fc27ccc41a47b",
".git/objects/43/e946e398d96aee466fa0aabb625f0889c3a4bd": "ac34520dee747f675e6e0a15c0bbd2be",
".git/objects/6b/4fb02561b90355b9affaaf3fb2a98360d08210": "d54f9393a079b3eb3882d68ece0e3121",
".git/objects/38/55220caa42fa1d57b1439a3185d66ea9363036": "538e90893c6136ef4c9322b1408c023f",
".git/objects/6e/9ad595290c5e9f97dcbbfb9129e9dfce89b534": "0e5eaecf15b13a595a05dfbd7dfbb3dc",
".git/objects/5c/c6b490a6d2abcb3104cd22d8091b93110b3719": "d4c8ffaa5603b7e1787b74cceb0cd761",
".git/objects/5d/25d72556e8447ddc5505ed3bfc806260c43215": "f1fb93cc73d3236bf9815febcc44ea31",
".git/objects/91/676e53e9179179d79ae793065c4a72f2dbd5fc": "d6e09ff8a5f54976c036a7a27fd88d13",
".git/objects/65/9a11255eda0ad12163711cb9cd3058d45db798": "9db39b2beab72c604ac324b5fb629e9a",
".git/objects/96/98a3812017d56fd347bc8229cadeb117ee0bc8": "d6b36589db4a6e8baa5a00e6852bdb21",
".git/objects/98/f3881ce6226f7f6c3975b645d2adaa1237ed0e": "947724f87f2eaaf8d850fa1491cee8fb",
".git/objects/53/b9f99961c84614da032232c91dc23c148bfb51": "c14fdbacedc0a1330aa2e3626d0dd455",
".git/objects/53/2fabb539c5c2e0f6f822a3e1817a3ecef16727": "a3800c735939daf0e04eb483fe655368",
".git/objects/30/d566b828afb18217b99a5faa82d1402a551c15": "aefc9cdafb0f54efae970d90049c470e",
".git/objects/5b/b5075aaa24d2c44f654f956caa88da0e099a5c": "70448be9df19eabfc3abe57d66b895be",
".git/objects/37/c46df17b39742d3d55e0332037902e43061bab": "833694c67ba8cd60d7d506f24be15dbb",
".git/objects/01/cd5529a1fd1f02db58475d83cfdfca2a98644b": "8da1a060d30c35c1643d22ff816b2156",
".git/objects/01/c26547579a43bac1d40fa1c275d809551d0054": "c36bd3479ae0a0dda7d86d11fa1ae5ca",
".git/objects/01/ff2bb6d5dc391ca2cfd881c6fac888dd9c8e2e": "4ee91500babbab85965e619b96dca310",
".git/objects/99/14138352d4472e01397af38c1171b995c146e3": "14e4d22f59e4ced97715cb6e244d28de",
".git/objects/52/fdd9d33edcdcf221ea190cfc6dcf74ea42656d": "7c4e26fcd1933d3133fe0ffd77153d4d",
".git/objects/55/d1117af0e5b48eff20b115979784f33ce28590": "e109f3c3bf741b2ab0a83fdac8d3adbe",
".git/objects/90/13fede797b84d383f15ea0a08eb38dbeff9266": "bb5435ee4548c90d572f30d8d1cdec49",
".git/objects/d3/6fa4ee6e34aa743c16b3ad3bf6f651bdac3e0a": "de1ceff5ca21e623cc9ebf3a72c72573",
".git/objects/d4/46b1540bac63f93dbae30896ad6d76e8cae481": "5a5f96040b448abc6b36679feac070b6",
".git/objects/ba/8cb00dd5231f1a55de0205c16445926a696526": "be8592f9341c9b01b70890c8614c6cf7",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/ba/4c943e1e49664c16258d7c454193255b7ebb16": "3edbf03b3c235de65168b88036893ae7",
".git/objects/a0/089f14e114b7a058a370449467d71d400d8123": "731c29d2d446bfeee4ca7dd979750bd0",
".git/objects/a0/b5d92d7c84fa1033d6ca08be6492200724a891": "2a353353019dabe251959979e6a61afd",
".git/objects/b1/e3b1f1e5ceefacd423a3189106e8164c27785f": "552bca48c8772c9a31a9c8bb4b882abb",
".git/objects/b1/2537d16d60e9777a43ddf1beac2d8c7e889414": "0597a600f0472e386d775eedfecec0f9",
".git/objects/dd/869a97c4a4ce97c55aed2a9d83b9aa28e78d42": "80ca7dabfc446846387958c5ef6d4cc8",
".git/objects/dd/38e63d7518fa5ac3ccd293562aab5c00ad5c0e": "d064077b9e0063fbe0eb1f6fa81091d5",
".git/objects/d5/fea9ac0065b671363cd88ac5374a9b7e120a36": "4b6c8d3e06ec1b8416ed67e4a4f1fb0d",
".git/objects/d5/4e13351b1b19985d056c8ed4f51ca5d9d2a1c8": "853e73d155653a9df2044c76ff2be43a",
".git/objects/d5/6357ea54bd19611296db196cf50bb03e3e97a5": "ff33a5f7c22f63e0e8b14bb34968d493",
".git/objects/d2/e81a8d9eb8a187c42fe6aeb0039d131ee291d5": "f9d3baadb56fa0e4ea96bcf38367a2a0",
".git/objects/a8/10af4951cc3a0aae94b20adcbdb8a86c869f6f": "55eb5c6ba7373f566848ae1f88924395",
".git/objects/a8/a27214a496707312ad1c52e8e68b6949acfb3a": "0bb64d8069f7f99b83129c94cca96697",
".git/objects/b0/663e59cd1a9d97d54897ae45bb4695013b1593": "574baef17d240a6c1cc950ca623769ad",
".git/objects/b0/2f5a04bc5240582432b6d4f11b5a64eb7bd5e9": "633fdea1db50b98717814621cd26970e",
".git/objects/b9/6b75cf7f66cd142e5eae90139f094db6b95987": "2be39eb8a892ab9d4c06182945bdc3d5",
".git/objects/b9/babb22f8f56e15b7f995105c186838a449987f": "851e3c8e2755feaa5dd30071a2340f7b",
".git/objects/a1/beb94379718e92267930a942ec80d5d7ced418": "b69070c4971385d55cbc719e699bab17",
".git/objects/a1/3a0a7a8af42b51a8a666196cedbdca52d7e0f4": "61745c245f87b4081866fe5bab3d54d3",
".git/objects/ef/26bbed42be2deba874b0df56437bc47d28d101": "64441dc8e2936540fc447becada25c0f",
".git/objects/c3/370cc083fffbdc7503735a782d14a24739fbcd": "ca6f851b54f50da949b1030671a8a225",
".git/objects/c3/078f2751fab9ec673116d806dca9294b5476ce": "46e5f2f6195a9137e07d31e25632c698",
".git/objects/c4/e981b3e89625c1885ddbc94aafa75abea1f262": "805f644375efbce0bc8c30fde1bcdd9c",
".git/objects/ea/e6b95d24d58b8c7fbaa490c50d74433a3f6bde": "d6aa454d2b7bb1babc3c4931289d52fa",
".git/objects/e1/06c3b9b813cd21c84e4ca49995ea66839b1d42": "4c7ed4af47638de88a6cb21388ffd6cf",
".git/objects/cc/e238b057e3504d38a3fbcfcb6841c242d78311": "35e458e70ea7fded04fb24ecacedbdce",
".git/objects/f9/90835cbf983ff0471672a6b23e3e3738935cfb": "53efffe90c8a0462dd5a100e6d3e0d5f",
".git/objects/e8/dcab8cb5c9f7fd02444ddcf4045902f2a69a4f": "d8b545e68f01cab991a4261f7e0663bf",
".git/objects/ff/0fcef41550c61ab585d72d2eeb3364a1c89091": "ddfd04659738638b1e1dbd718133ef55",
".git/objects/c5/96aed222c4db7c608b685dffdf5826abac20fc": "e61b795a0e1e02866da303e5826ee4dc",
".git/objects/f6/524cf75e303cd1f79de4c35ab7ec93858058fe": "08c2d09bd9a7a0361fea3568135ccc36",
".git/objects/e9/94b9252cf6ddc0f8635b92cca265b505338675": "e9ef0015e342aef6d76bf1461334023e",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/79/edce8610a5b69b74bed2264c6d8293a4780af7": "5dc1b36c586327fecc3990d085d5d34f",
".git/objects/2d/5ababc7187833a32f1da81b3206e68f83bbd69": "98cea8523c6d351cc587a5dd96059e42",
".git/objects/83/b847138c165a30a724f5b35a78c8d936f0e57d": "a312e3580e578bfe5f89120aa3450a52",
".git/objects/83/277f1757e92c5069592c01a32222f8cde88688": "04c68266278a25ae4071c9e99d6a89d9",
".git/objects/1b/d5537bdc41821c1565a70e67c6f062c365f277": "b80ea3f3af6c4d4a23c696f81eab48be",
".git/objects/77/2c5f41187b5207091ea3c0af058d353019f122": "b3c55c2b395017f1906ce4a62e6cc428",
".git/objects/48/33fcf9ba677d3df448c90e63368e50f8bfc8d6": "a5b926fccf641f8e2a09e52478c0d37a",
".git/objects/48/59033c0b92d66591960579c4b1bb3b98b36932": "a99ee112e5cb48aa2f64ce223c6ddaf5",
".git/objects/84/e0ad75a5244b10fc672ac894c64b7bc5db8fc1": "8f49e703925f06d9ae0036f9f6819e86",
".git/objects/24/61782be3c247029af0bf69d410c57f991a774a": "f17d9fd9295849b86b8fb4652981c3e4",
".git/objects/4f/d0e51f345ee398d4c56c9a2a36514cfdc54f3e": "d8e976b7b97437231f01681fc40815a3",
".git/objects/8d/53884dbe7b64a09cbb27208543fd7043aa44a7": "5ea578600174578caa58a64e3d5c037f",
".git/objects/15/f898dc8f9399ce18ea76a74790b3a4d6bb7f23": "3abb312ef2486d0cd3d8b87fa0679e84",
".git/objects/12/fb9648c424b8bbf8ad690e7eaf9eeb76825b94": "78efe47f12255badcd80f18b86b43482",
".git/objects/12/7cbbb5b02c8ee5d069cbc2941afcfd59c98453": "ce82fecc4d7925c4c53cac70dcbe1b70",
".git/objects/85/ccd29fa9a031a8c55cd1c3f01755d2fa2b6c99": "d528dc10e2230befa722dc4b0c8dab54",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/71/8bd97d834ca7304ee9e9914bdda6be89afe76b": "6093d5542720c75947fcadf62e1b1f3f",
".git/objects/76/cd2869ddf8d49d65ab799edec563721c93a0c6": "64916563fb9d78f1af3eb2abad78c01f",
".git/objects/82/a7c0cb1269231dd1bc27fa1b61ae75c430bb83": "6b75458e4ca4547bf47f68c334c36f62",
".git/objects/82/178b84d4c1b5114dcd42500a331bba0151135a": "5e363d48cb2eddfeea7523d17c71e7c3",
".git/objects/2b/e39c7fd3da441ddac9bea54fd12621dd39960a": "24031b20667d22ca8dba4debe8b9eab5",
".git/objects/7f/ddf9c7deab6c481ba77bebeb20a4524a2555e8": "5b873e5b2dd1fe607db3d3aad31fcb04",
".git/objects/7f/4dc4d93001b5f32252c8864a269310d04e1f2a": "5712c299cec5ff2f3c7ffbf665487f2d",
".git/objects/8e/cb5a9c8bef361a78c83acf12c3bda6c6758166": "700ee651c29da9657ea57003855bc0a8",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "cff97ead63d898fd75e2cc930177a4d5",
".git/logs/refs/heads/main": "26c68b7eef006f007a9fe08e1cb082e0",
".git/logs/refs/remotes/origin/main": "adcb3c3b7e8a069d6df9c380bb34438a",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/main": "9e28e756fc5f6efbdff6ea2cf07f87ba",
".git/refs/remotes/origin/main": "9e28e756fc5f6efbdff6ea2cf07f87ba",
".git/index": "94b7a91877e1964ee0b092267321afe8",
".git/COMMIT_EDITMSG": "45c9eb7fa6e6a781268f8a3b8d62d8b9",
".git/FETCH_HEAD": "d64480ca82b4210432ef08c4219cd3db",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/NOTICES": "27d9ef357aa28b6979cc44687413475d",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "69a99f98c8b1fb8111c5fb961769fcd8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "693635b5258fe5f1cda720cf224f158c",
"assets/fonts/MaterialIcons-Regular.otf": "b3bd36380f073311c959bd9493b76896",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
