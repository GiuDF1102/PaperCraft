"use strict";
const ai = [
  {
    type: "chat",
    title: "Semantic Segmentation",
    prompt: "Semantic Segmentation is a fundamental yet challenging task in computer vision for which the objective is to assign a specific label to each pixel in an image. For this reason, it is useful in a wide range of real-world applications such as autonomous driving, computerized medical diagnosis, defect detection and so on.\n"+
      " Lately, Semantic Segmentation has experienced significant advancements, driving an increasing demand for top-notch models and generating considerable buzz in the field.  With the advent of FCNs (Fully Convolutional Networks), semantic segmentation has experienced an important phase in computer vision, in which the segmentation accuracy was dramatically  increase \n"+
      "With the advancements in interactive applications, Semantic Segmentation has also recently been applied to the real-time fields of augmented reality and video surveillance which, along with autonomous driving, nowadays require an efficient inference speed for rapid interaction response. In summary, semantic segmentation drive innovation.",
    answer:
      'The passage effectively introduces the concept of semantic segmentation and its significance in computer vision applications. However, the use of informal language such as "on steroids" and "buzzing with excitement" may not be suitable for academic purposes, as it detracts from the formal tone expected in scholarly writing. Additionally, be careful about some grammatical errors.',
    segments: [
      {
        segment:
          "Semantic Segmentation is a fundamental yet challenging task in computer vision for which the objective is to assign a specific label to each pixel in an image. For this reason, it is useful in a wide range of real-world applications such as autonomous driving, computerized medical diagnosis, defect detection and so on.\n",
      },
      {
        segment:
          "Lately, Semantic Segmentation has experienced significant advancements, driving an increasing demand for top-notch models and generating considerable buzz in the field. ",
        corrections: {
          type: "Tone",
          score: -2,
          suggestion:
            "This is not the right tone, a more formal tone could be achieved by rephrasing it.",
        },
      },
      {
        segment:
          "With the advent of FCNs (Fully Convolutional Networks), semantic segmentation has experienced an important phase in computer vision, in which the segmentation accuracy was dramatically ",
      },
      {
        segment: "increase",
        corrections: {
          type: "Grammar",
          score: -2,
          suggestion:
            "This is not the right form, 'increase' should be replaced with 'increased'",
          attempts: [
            {
              text: "increased",
            },
          ],
        },
      },
      {
        segment:
          "\nWith the advancements in interactive applications, Semantic Segmentation has also recently been applied to the real-time fields of augmented reality and video surveillance which, along with autonomous driving, nowadays require an efficient inference speed for rapid interaction response.",
      },
      {
        segment: " In summary, semantic segmentation ",
      },
      {
        segment: "drive",
        corrections: {
          type: "Grammar",
          score: -1,
          suggestion: "You should use the third person here.",
          attempts: [
            {
              text: "drives"
            }
          ]
        }
      },
      {
        segment: " innovation."
      }
    ],
  },
  {
    title: "Semantic Segmentation",
    type: "chat",
    prompt:
      "This draft of my abstract explores semantic segmentation, could you please help me enhance the tone? Here is the text: “Deep hierarchical semantic segmentation shows how computers can perceive like humans, going beyond old-school methods. It introduces a sophisticated approach that enable computers to achieve a level of perception akin to human cognition.”",
    answer:
      "It seems to me this could be greatly improved. I highlighted for you" +
      " some parts that could be polished! Click on the highlighted text to" +
      " get a suggestion!",
    segments: [
      {
        segment: "This draft of my abstract explores semantic segmentation, could you please help me enhance the tone? Here is the text:",
      },
      {
        segment:
          "Deep hierarchical semantic segmentation shows how computers can perceive like humans, going beyond old-school methods. ",
        corrections: {
          type: "Tone",
          suggestion:
            "The phrase is informal, using a direct question for reader" +
            " engagement. Academic writing requires a formal, objective tone," +
            " prioritizing clarity and precision.",
          score: -2,
        },
      },
      {
        segment: "It introduces a sophisticated approach that ",
      },
      {
        segment:
          "enable",
        corrections: {
          type: "Grammar",
          suggestion:
            "This verb is not well conjugated in this sentence.",
          score: -2,
          attempts: [{
            text: "enables"
          }]
        },
      },
      {
        segment: " computers to achieve a level of perception akin to human cognition.”",
      },
    ],
  },
  {
    title: "Semantic Segmentation",
    type: "chat",
    prompt:
      "That's great, could you please add the concept of Instance Segmentation to the abstract?",
    answer:
      "Sure, here you go: \"Deep hierarchical semantic segmentation showcases the ability of computers to perceive the visual world akin to humans, surpassing traditional methods. It introduces a sophisticated approach that enables computers to achieve a level of perception akin to human cognition, while instance segmentation further refines this capability by delineating individual objects within a scene.\"",
    segments: [
      {
        segment: "That's great, could you please add the concept of Instance Segmentation to the abstract?",
      }
    ],
  },
  {
    title: "Semantic Segmentation",
    type: "chat",
    prompt:
      "Can you give me some tips on how to avoid plagiarism in my paper?",
    answer:
      "To avoid plagiarism, always credit sources for their ideas, data, and language. Use citations for quotes, paraphrases, and summaries. Analyze and interpret information independently. Check your work with plagiarism detection tools and organize your sources properly. When unsure, seek guidance from instructors or advisors.",
    segments: [
      {
        segment: "Can you give me some tips on how to avoid plagiarism in my paper?",
      }
    ],
  },
  {
    title: "Semantic Segmentation",
    type: "chat",
    prompt:
      "Traditional methods in semantic segmentation have often grappled with inherent limitations, failing to capture intricate details and nuances present in visual data. In contrast, deep hierarchical semantic segmentation represents a paradigm shift, harnessing the power of deep learning to unravel the complexities of visual scenes.",
    answer:
      "The text you provided is clear and effectively communicates the comparison between traditional methods in semantic segmentation and deep hierarchical semantic segmentation. However, it could be slightly improved for clarity and precision.",
    segments: [
      {
        segment: "Traditional methods in semantic segmentation ",
      },
      {
        segment: "have often grappled with inherent limitations",
        corrections: {
          type: "Clarity",
          suggestion:
            "This snippet could be considered slightly verbose or formal depending on the context. ",
          score: -2,
        },
      },
      {
        segment:
          "failing to capture intricate details and nuances present in visual data. In contrast, deep hierarchical semantic segmentation represents a paradigm shift, harnessing the power of deep learning to unravel the complexities of visual scenes.",
      },
    ],
  },
  {
    title: "Semantic Segmentation",
    type: "chat",
    prompt:
      "In conclusion, deep hierarchical semantic segmentation represents a seminal advancement in the realm of computer vision, usheraeing in a new era of human-level perception in machines. By unraveling the intricate semantics embedded within visual data, this paradigm transcends the constraints of traditional methods, offering a transformative framework for understanding and interpreting the visual world.",
    answer:
      "The snippet provided effectively conveys the significance of deep hierarchical semantic segmentation in advancing computer vision towards human-level perception. However, there are a few areas where clarity and precision can be enhanced.",
    segments: [
      {
        segment:
          "In conclusion, deep hierarchical semantic segmentation represents a ",
      },
      {
        segment: "seminal advancement in the realm of computer vision,",
        corrections: {
          type: "Clarity",
          suggestion:
            'While "seminal advancement" is descriptive, it may benefit from a more specific explanation of what aspects of computer vision are being advanced. ',
          score: -2,
        },
      },
      {
        segment: "usheraeing",
        corrections: {
          type: "Grammar",
          suggestion:
            "This form is wrong, you might want to substitute it with 'ushering'",
          attempts: [
            {
              text: "ushering",
            },
          ],
          score: -1,
        },
      },
      {
        segment:
          " in a new era of human-level perception in machines. By unraveling the intricate semantics embedded within visual data, this paradigm transcends the constraints of traditional methods, offering a transformative framework for understanding and interpreting the visual world.",
      },
    ],
  },
  {
    title: "AI",
    type: "chat",
    prompt:
      "The field of artificial intelligence (AI) has experienced rapid growth and innovation in recent years, revolutionizing various industries and aspects of everyday life. AI encompasses a broad range of technologies and applications, including machine learning, natural language processing, computer vision, and robotics. As AI continues to advance, it presents both opportunities and challenges, raising ethical, societal, and economic considerations.",
    segments: [
      {
        segment:
          "The field of artificial intelligence (AI) has experienced rapid growth and innovation in recent years, revolutionizing various industries and aspects of everyday life.",
      },
      {
        segment:
          "AI encompasses a broad range of technologies and applications, including machine learning, natural language processing, computer vision, and robotics.",
      },
      {
        segment:
          "As AI continues to advance, it presents both opportunities and challenges, raising ethical, societal, and economic considerations.",
        corrections: {
          type: "Tone",
          suggestion:
            "Consider using more nuanced language to discuss the implications of AI advancement.",
          score: -3,
        },
      },
    ],
    answer:
      "The prompt provides an overview of the rapid growth and innovation in the field of artificial intelligence (AI), highlighting its impact on various industries and aspects of everyday life. However, there are areas for improvement in discussing the implications of AI advancement, including the need for more nuanced language and sentence restructuring for clarity and flow.",
  },
  {
    title: "Real-time Domain Adaptation in Semantic Segmentation",
    type: "document",
    fileName: "Real-time_Domain_Adaptation_in_Semantic_Segmentation.pdf",
    prompts: [
      {
        title: "Abstract",
        prompt:
          "In the rapidly evolving landscape of computer vision, the demand for real-time semantic segmentation models is increasing at a fast pace. This paper addresses two main challenges posed by this demand: firstly, the extreme high cost in terms of time of collecting pixel-wise annotations and, secondly, the trade-off between performance and efficiency in the case of real-time scenarios, where performance is necessarily degraded in favour of efficiency.\n But introducing the Short-Term Dense Concatenate network helps us deal with the problem of collecting lots of training data for Real-time Domain Adaptation. Our methodology revolves around discerning disparities between learning (source) and application (target) domains. Through Adversarial Domain Adaptation, our model dynamically adjusts to new environments, enhancing adaptability without sacrificing efficiency.\n In essence, our approach address challenges of data acquisition and balances speed with accuracy in computer vision. This innovative paradigm holds promise for advancing semantic segmentation in real-world contexts.",
        segments: [
          {
            segment:
              "In the rapidly evolving landscape of computer vision, the demand for real-time semantic segmentation models is increasing at a fast pace. This paper addresses two main challenges posed by this demand: firstly, the extreme high cost in terms of time of collecting pixel-wise annotations and, secondly, the trade-off between performance and efficiency in the case of real-time scenarios, where performance is necessarily degraded in favour of efficiency.\n",
          },
          {
            segment:
              "But introducing the Short-Term Dense Concatenate network helps us deal with the problem of collecting lots of training data for Real-time Domain Adaptation.",
            corrections: {
              type: "Tone",
              score: -3,
              suggestion:
                "The phrase 'like getting the image, preparing it' sounds informal. A more formal tone could be achieved by rephrasing it",
            },
          },
          {
            segment:
              "Our methodology revolves around discerning disparities between learning (source) and application (target) domains. Through Adversarial Domain Adaptation, our model dynamically adjusts to new environments, enhancing adaptability without sacrificing efficiency.\n",
          },
          {
            segment: "In essence, our approach ",
          },
          {
            segment: "address ",
            corrections: {
              type: "Grammar",
              score: -2,
              suggestion:
                "This is not the right form, make sure to respect the relationship between subject and verb.",
              attempts: [
                {
                  text: "addresses",
                },
              ],
            },
          },
          {
            segment:
              "challenges of data acquisition and balances speed with accuracy in computer vision. This innovative paradigm holds promise for advancing semantic segmentation in real-world contexts.",
          },
        ],
        answer:
          "The passage effectively introduces challenges in real-time semantic segmentation and proposes the Short-Term Dense Concatenate network as a solution. While it succinctly outlines the methodology, some informal language however may not align with academic writing standards. Adjusting the tone for clarity and precision would enhance its academic suitability. This section could also need some grammar refinement.",
      },
      {
        title: "Introduction",
        prompt:
          "Semantic Segmentation is a fundamental yet challenging task in computer vision for which the objective is to assign a specific label to each pixel in an image. For this reason, it is useful in a wide range of real-world applications such as autonomous driving, computerized medical diagnosis, defect detection and so on.\n Lately, Semantic Segmentation has experienced significant advancements, driving an increasing demand for top-notch models and generating considerable buzz in the field. With the advent of FCNs (Fully Convolutional Networks), semantic segmentation has experienced an important phase in computer vision, in which the segmentation accuracy was dramatically increase.\n With the advancements in interactive applications, Semantic Segmentation has also recently been applied to the real-time fields of augmented reality and video surveillance which, along with autonomous driving, nowadays require an efficient inference speed for rapid interaction response.",
        segments: [
          {
            segment:
              "Semantic Segmentation is a fundamental yet challenging task in computer vision for which the objective is to assign a specific label to each pixel in an image. For this reason, it is useful in a wide range of real-world applications such as autonomous driving, computerized medical diagnosis, defect detection and so on.\n",
          },
          {
            segment:
              "Lately, Semantic Segmentation has experienced significant advancements, driving an increasing demand for top-notch models and generating considerable buzz in the field. ",
            corrections: {
              type: "Tone",
              score: -2,
              suggestion:
                "This is not the right tone, a more formal tone could be achieved by rephrasing it.",
            },
          },
          {
            segment:
              "With the advent of FCNs (Fully Convolutional Networks), semantic segmentation has experienced an important phase in computer vision, in which the segmentation accuracy was dramatically ",
          },
          {
            segment: "increase",
            corrections: {
              type: "Grammar",
              score: -2,
              suggestion:
                "This is not the right form, 'increase' should be replaced with 'increased'",
              attempts: [
                {
                  text: "increased",
                },
              ],
            },
          },
          {
            segment:
              "\nWith the advancements in interactive applications, Semantic Segmentation has also recently been applied to the real-time fields of augmented reality and video surveillance which, along with autonomous driving, nowadays require an efficient inference speed for rapid interaction response.",
          },
        ],
        answer:
          'The passage effectively introduces the concept of semantic segmentation and its significance in computer vision applications. However, the use of informal language such as "on steroids" and "buzzing with excitement" may not be suitable for academic purposes, as it detracts from the formal tone expected in scholarly writing. Additionally, be careful about some grammatical errors.',
      },
      {
        title: "Related Work",
        prompt:
          "The technical community is well aware of the significant challenges involved in gathering the extensive data required to train these large architectures. Achieving state-of-the-art performance often demands a considerable number of pixel-wise annotations. Consequently, the task of assembling and annotating extensive image sets across various conditions has spurred the creation of synthetic datasets like SYNTHIA, IDDA, and GTA V.\n In our project, we're taking a novel approach to address these challenges. We're delving into Domain Adaptation techniques, capitalize on the richness of the GTA V dataset. By doing so, we aim to overcome the limitations inherent in conventional methods and infuse our models with greater realism and adaptability. It's all about navigating smarter pathways for training our systems in real-world scenarios, without drowning in the annotation deluge.",
        segments: [
          {
            segment:
              "The technical community is well aware of the significant challenges involved in gathering the extensive data required to train these large architectures.",
            corrections: {
              type: "Tone",
              score: -2,
              suggestion:
                "The tone of this sentence is too informal for academic purposes, you should try to use a more formal tone.",
            },
          },
          {
            segment:
              "\nAchieving state-of-the-art performance often demands a considerable number of pixel-wise annotations. Consequently, the task of assembling and annotating extensive image sets across various conditions has spurred the creation of synthetic datasets like SYNTHIA, IDDA, and GTA V.",
          },
          {
            segment:
              "In our project, we're taking a novel approach to address these challenges. We're delving into Domain Adaptation techniques, ",
          },
          {
            segment: "capitalize",
            corrections: {
              type: "Grammar",
              score: -2,
              suggestion:
                "This is not the right form, 'capitalize' should be replaced with 'capitalizing'",
              attempts: [
                {
                  text: "capitalizing",
                },
              ],
            },
          },
          {
            segment:
              "on the richness of the GTA V dataset. By doing so, we aim to overcome the limitations inherent in conventional methods and infuse our models with greater realism and adaptability. It's all about navigating smarter pathways for training our systems in real-world scenarios, without drowning in the annotation deluge.",
          },
        ],
        answer:
          "The tone of the passage is informal and conversational, which may not be ideal for academic purposes. Academic writing typically requires a more formal and structured tone, with precise language and clear delineation of concepts. While the passage effectively communicates its message, it would benefit from refinement to better align with the conventions of academic discourse.",
      },
      {
        title: "Method",
        prompt:
          "Breaking down the model resembles a dynamic duo: Within the framework, a segmentation network assumes the task of predicting pixel labels, a computationally intensive endeavor. Concurrently, a discriminator network operates to differentiate between the source and target domains, serving as a critical component in domain distinction and adaptation.\n The main goal here is to blend two key ingredients: The segmentation loss pertains to the source domain, whereas the adversarial loss aims to synchronize target domain predictions with the distribution observed in the source domain. This adversarial component functions akin to a dual-edged instruments. On one facet, it prompts the discriminator to adeptly discern source domain predictions. Conversely, on the other facet, it induces the discriminator to regard target domain predictions with the same credibility as those originating from the source domain.",
        segments: [
          {
            segment:
              "Breaking down the model resembles a dynamic duo",
            corrections: {
              type: "Tone",
              score: -3,
              suggestion:
                "You are not using the proper tone for this sentence, a more appropriate tone would be more formal.",
            },
          },
          {
            segment:
              ": Within the framework, a segmentation network assumes the task of predicting pixel labels, a computationally intensive endeavor. Concurrently, a discriminator network operates to differentiate between the source and target domains, serving as a critical component in domain distinction and adaptation.",
          },
          {
            segment: "The main goal here is to blend two key components",
            corrections: {
              type: "Tone",
              score: -2,
              suggestion:
                "This sentence is too informal, you should try to use a more formal tone.",
            },
          },
          {
            segment:
              ": The segmentation loss pertains to the source domain, whereas the adversarial loss aims to synchronize target domain predictions with the distribution observed in the source domain. This adversarial component functions akin to a dual-edged ",
          },
          {
            segment: "instruments",
            corrections: {
              type: "Grammar",
              score: -1,
              suggestion:
                "This is not the right form, you probably meant to use the singular form of the noun.",
              attempts: [
                {
                  text: "instrument",
                },
              ],
            },
          },
          {
            segment:
              "On one facet, it prompts the discriminator to adeptly discern source domain predictions. Conversely, on the other facet, it induces the discriminator to regard target domain predictions with the same credibility as those originating from the source domain.",
          },
        ],
        answer:
          "This section lacks the formal tone typically expected in academic writing. It could be revised to begin more directly with the technical description of the model. In addition, there are some grammatical errors that could be corrected.",
      },
      {
        title: "Conclusions",
        prompt:
          "In conclusion, our methodology addresses the intricacies of real-time semantic segmentation through the strategic integration of a segmentation network in conjunction with a discriminator network. This synergistic collaborative framework operates in concert to efficaciously realize our research objectives.",
        segments: [
          {
            segment:
              "In conclusion, our approach tackles the challenges of real-time semantic segmentation by employing a segmentation network paired with a discriminator network. ",
          },
          {
            segment: "This synergistic collaborative framework operates in concert to efficaciously realize our research objectives.",
            corrections: {
              type: "Clarity",
              score: -2,
              suggestion: "This phrase might sound too intricated for academic purposes, as it is overly complicated.",
            },
          },
        ],
        answer:
          "The language used is formal and appropriate, however it could need some tuning for accessibility, which aids in understanding the technical aspects of the methodology. ",
      },
    ],
  },
];

let chats = [
  {
    type: "document",
    title: "Advancements and Applications of Computer Vision",
    prompts: [
      {
        title: "Introduction",
        prompt:
          "Computer vision, a subset of artificial intelligence, is about making machines see and understand images and videos. It has seen a lot of growth recently due to technology and algorithms. This paper gives an overview of what computer vision is, its recent improvements, and how it's being used.",
        answer:
          "Overall, the statement effectively introduces the topic of computer vision, highlighting its role in enabling machines to interpret visual data. However, it could benefit from greater clarity and sophistication in language to enhance the tone. Additionally, ensuring subject-verb agreement and refining the structure for smoother flow would further improve the statement's grammar and readability.",
        segments: [
          {
            segment: "Computer vision, a subset of artificial intelligence, ",
          },
          {
            segment: "is about making",
            corrections: {
              type: "Grammar",
              score: -2,
              attempts: [
                {
                  text: "focuses on enabling",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 0,
                  },
                },
              ],
              suggestion:
                "'is about making' should be replaced with 'focuses on enabling'",
            },
          },
          {
            segment:
              " machines see and understand images and videos. It has seen a lot of growth recently due to technology and algorithms. This paper gives an overview of what computer vision is, its recent improvements, and how it's being used.",
          },
        ],
      },
      {
        title: "Fundamentals of Computer Vision",
        prompt:
          "Computer vision is mainly about getting useful information from digital images or videos. It has several parts like getting the image, preparing it, finding important parts, comparing them, and figuring out what they mean. Algorithms like convolutional neural networks (CNNs), deep learning models, and machine learning are important for working with images.",
        answer:
          "The statement provides a clear overview of computer vision, emphasizing its purpose in extracting valuable insights from digital images and videos. However, to enhance clarity and flow, it could benefit from a more varied sentence structure and the use of transitional phrases. Additionally, ensuring consistent verb tense usage would improve the overall grammar.",
        segments: [
          {
            segment:
              "Computer vision is mainly about getting useful information from digital images or videos. ",
          },
          {
            segment:
              "It has several parts like getting the image, preparing it, finding important parts, comparing them, and figuring out what they mean.",
            corrections: {
              type: "Tone",
              score: -3,
              attempts: [
                {
                  text: "It has several parts such as image acquisition, preprocessing, finding important parts, comparing them, and figuring out what they mean.",
                  settings: {
                    length: 2,
                    style: 0,
                    creativity: 1,
                  },
                },
              ],
              suggestion:
                "The phrase 'like getting the image, preparing it' sounds informal. A more formal tone could be achieved by rephrasing it",
            },
          },
          {
            segment:
              "Algorithms like convolutional neural networks (CNNs), deep learning models, and machine learning are important for working with images.",
          },
        ],
      },
      {
        title: "Recent Advancements",
        prompt:
          "Deep learning, especially CNNs, has made big strides in computer vision. CNNs can learn about images in layers, which helps them understand images better. This has made them better at finding objects, recognizing them, and drawing borders around them. GANs are a big deal for creating realistic images. They work by having two networks, one creating images and the other saying if they're real or fake. GANs are used for making high-quality images, making blurry images clearer, and changing images in interesting ways. Transfer learning is a smart way to use knowledge from one task to help with another. It's helped a lot in computer vision because it lets us use what we already know to learn new things faster. This means we don't always need lots of new data to make our systems work better.",
        answer:
          "The provided text effectively introduces key concepts in computer vision, including deep learning, GANs, and transfer learning. However, to enhance the style, it would benefit from more varied sentence structures and transitions between ideas. Additionally, incorporating more descriptive language and refining the phrasing could elevate the overall readability and engagement of the text.",
        segments: [
          {
            segment:
              "Deep learning, especially CNNs, has made big strides in computer vision. ",
          },
          {
            segment:
              "CNNs can learn about images in layers, which helps them understand images better.",
            corrections: {
              type: "Clarity",
              score: -2,
              attempts: [
                {
                  text: "CNNs can learn about images in layers, which, in turn, helps them understand images better.",
                  settings: {
                    length: 1,
                    style: 1,
                    creativity: 1,
                  },
                },
              ],
              suggestion:
                "The phrase 'which helps them understand images better' is a non-restrictive relative clause, and it should be set off by commas to improve readability.",
            },
          },
          {
            segment:
              " This has made them better at finding objects, recognizing them, and drawing borders around them. GANs are a big deal for creating realistic images. They work by having two networks, one creating images and the other saying if they're real or fake. GANs are used for making high-quality images, making blurry images clearer, and changing images in interesting ways. Transfer learning is a smart way to use knowledge from one task to help with another. It's helped a lot in computer vision because it lets us use what we already know to learn new things faster. This means we don't always need lots of new data to make our systems work better.",
          },
        ],
      },
      {
        title: "Applications of Computer Vision",
        prompt:
          "Autonomous Vehicles: Computer vision is super important for self-driving cars. It helps them see the road, recognize objects, follow lanes, and avoid crashes. They use cameras, LiDAR, and radar to know what's around them and make decisions while driving. In healthcare, computer vision helps with analyzing medical images, finding diseases, and guiding surgeries. It can spot problems in X-rays, MRIs, and CT scans, helping doctors treat patients better. Computer vision is changing how we shop online. It helps us find products, suggests things we might like, and keeps track of what's in stock. Retailers use it to make shopping easier and keep customers happy. AR and VR use computer vision to mix digital stuff with the real world. They track objects, recognize gestures, and understand faces to make virtual experiences feel real.",
        answer:
        "The text employs a clear and informative tone, with grammatically correct sentences, to succinctly elucidate the diverse applications of computer vision technology across autonomous vehicles, healthcare, online shopping, and AR/VR.",
        segments: [
          {
            segment:
              "Autonomous Vehicles: Computer vision is super important for self-driving cars. It helps them see the road, recognize objects, follow lanes, and avoid crashes. ",
          },
          {
            segment:
              "They use cameras, LiDAR, and radar to know what's around them and make decisions while driving.",
            corrections: {
              type: "Clarity",
              score: -1,
              attempts: [
                {
                  text: "They utilize cameras, LiDAR, and radar to perceive their surroundings and make informed decisions while navigating.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 0,
                  },
                },
              ],
              suggestion:
                "'Perceive their surroundings' is a more descriptive and precise phrase than 'know what's around them,' enhancing clarity and specificity.",
            },
          },
          {
            segment:
              " In healthcare, computer vision helps with analyzing medical images, finding diseases, and guiding surgeries. It can spot problems in X-rays, MRIs, and CT scans, helping doctors treat patients better. Computer vision is changing how we shop online. It helps us find products, suggests things we might like, and keeps track of what's in stock. Retailers use it to make shopping easier and keep customers happy. AR and VR use computer vision to mix digital stuff with the real world. They track objects, recognize gestures, and understand faces to make virtual experiences feel real.",
          },
        ],
      },
      {
        title: "Conclusion",
        prompt:
          "Computer vision is a big deal that's changing a lot of things. As it gets better, we'll see more ways it can help us in our daily lives. From driving to healthcare to shopping, computer vision is making things easier and more fun. We're only scratching the surface of what's possible, and it's exciting to see where it goes next.",
        answer:
          "The text adopts an optimistic and conversational tone, utilizing simple language and correct grammar to convey excitement about the transformative potential of computer vision in various aspects of daily life.",
        segments: [
          {
            segment:
              "Computer vision is a big deal that's changing a lot of things. As it gets better, we'll see more ways it can help us in our daily lives.",
            corrections: {
              type: "Tone",
              score: -2,
              attempts: [
                {
                  text: "Computer vision stands as a significant innovation reshaping numerous aspects of our world. As its capabilities advance, we anticipate discovering increasingly diverse ways it can enrich our daily experiences.",
                  settings: {
                    style: 2,
                    length: 2,
                    creativity: 0,
                  },
                },
              ],
              suggestion:
                "Improve the tone by using more formal language and emphasize the potential for ongoing advancements in computer vision technology to positively influence lives.",
            },
          },
          {
            segment:
              " From driving to healthcare to shopping, computer vision is making things easier and more fun. We're only scratching the surface of what's possible, and it's exciting to see where it goes next.",
          },
        ],
      },
    ],
  },
  {
    type: "chat",
    title: "Psychology",
    prompts: [
      {
        prompt:
          "Psychology, a subject that deals with the mind and behavior, tries to understand why people think, feel, and do what they do. It has been around for a while, tracing back to old philosophy stuff. It's kind of complicated now, with lots of theories and methods and stuff. This paper is going to talk about psychology basics, recent things, and how it's used.",
        segments: [
          {
            segment:
              "Psychology, a subject that deals with the mind and behavior, tries to understand why people think, feel, and do what they do. It has been around for a while, tracing back to ",
          },
          {
            segment: "old philosophy stuff",
            corrections: {
              type: "Tone",
              suggestion:
                "Using more precise and respectful language would be more appropriate when discussing the historical roots of psychology.",
              attempts: [
                {
                  text: "early philosophical inquiries",
                  settings: {
                    style: 2,
                    length: 1,
                    creativity: 2,
                  },
                },
                {
                  text: "ancient philosophical roots",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
              ],
              score: -2,
            },
          },
          {
            segment: ". It's kind of complicated now, with ",
          },
          {
            segment: "lots of theories and methods and stuff",
            corrections: {
              type: "Tone",
              suggestion:
                "Using more precise language to describe the diverse theoretical perspectives and research methodologies within the field of psychology would enhance understanding and credibility.",
              attempts: [
                {
                  text: "a multitude of theoretical frameworks and research methodologies",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 0,
                  },
                },
                {
                  text: "a wide array of theoretical frameworks and research methodologies",
                  settings: {
                    style: 2,
                    length: 2,
                    creativity: 0,
                  },
                },
              ],
              score: -2,
            },
          },
          {
            segment:
              ". This paper is going to talk about psychology basics, recent things, and how it's used.",
          },
        ],
        answer:
          "The text adopts a casual and informal tone, which may not be suitable for an academic or professional setting. The language is colloquial and lacks precision, with phrases like 'old philosophy stuff' and 'lots of theories and methods and stuff' detracting from the clarity and professionalism of the writing. Overall, the tone and style of the text could be improved to better convey the importance and complexity of the subject matter.",
      },

      {
        prompt:
          "This paper talks about psychology, exploring the intricate interplay between nature and nurture in shaping human behavior. Drawing upon various psychological theories and research findings, it examines the influences of genetics, environment, and individual experiences on personality development, cognitive processes, and social interactions. Through a comprehensive analysis, this paper aims to elucidate the complex dynamics that contribute to the understanding of human behavior and pave the way for future advancements in psychological research and practice.",
        segments: [
          {
            segment:
              "This paper ",
          },
          {
            segment:
              "talks about",
            corrections: {
              type: "Tone",
              suggestion:
                "Consider using more precise language",
              attempts: [
                {
                  text: "delves into the multifaceted realm of",
                  settings: {
                    style: 2,
                    length: 1,
                    creativity: 2,
                  },
                },
              ],
              score: -2,
            },
          },
          {
            segment:
              " psychology, exploring the intricate interplay between nature and nurture in shaping human behavior. Drawing upon various psychological theories and research findings, it examines the influences of genetics, environment, and individual experiences on personality development, cognitive processes, and social interactions. Through a comprehensive analysis, this paper aims to elucidate the complex dynamics that contribute to the understanding of human behavior and pave the way for future advancements in psychological research and practice.",
          },
        ],
        answer:
          "The paragraph explores how genetics, environment, and individual experiences shape human behavior, drawing on psychological theories and research. It examines personality development, cognitive processes, and social interactions, aiming to clarify the complex dynamics of human behavior and advance psychological research and practice. The tone is formal, grammar is correct, and the message is clear.",
      },
      {
        prompt:
          "The study of psychology offers valuable insights into the complexities of human behavior and cognition. Its historical roots can be traced back to early philosophical inquiries. Today, psychology encompasses a rich tapestry of theories and methodologies, facilitating a deeper understanding of the human mind. This paper endeavors to elucidate core concepts in psychology, recent advancements, and the practical implications of psychological research.",
        segments: [
          {
            segment:
              "The study of psychology offers valuable insights into the complexities of human behavior and cognition. Its historical roots can be traced back to early philosophical inquiries.",
          },
          {
            segment:
              "Today, psychology encompasses a rich tapestry of theories and methodologies, facilitating a deeper understanding of the human mind.",
            corrections: {
              type: "Tone",
              suggestion:
                "Consider using more precise language to describe the breadth of theories and methodologies within psychology.",
              attempts: [
                {
                  text: "a diverse array of theories and methodologies",
                  settings: {
                    style: 1,
                    length: 0,
                    creativity: 1,
                  },
                },
                {
                  text: "a wide spectrum of theoretical frameworks and research methods",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
              ],
              score: -2,
            },
          },
          {
            segment:
              "This paper endeavors to elucidate core concepts in psychology, recent advancements, and the practical implications of psychological research.",
          },
        ],
        answer:
          "The text effectively communicates the significance of psychology as a field of study, highlighting its historical foundations and contemporary relevance. By acknowledging early philosophical inquiries as the precursor to modern psychology, the text provides context for the evolution of the discipline. Furthermore, the mention of recent advancements and practical implications underscores the dynamic nature of psychological research. Overall, the tone is informative and accessible, catering to a broad audience.",
      },
    ],
  },
  {
    type: "chat",
    title: "Medicine",
    prompts: [
      {
        prompt:
          "Medicine is a field that involves the study, diagnosis, and treatment of diseases and medical conditions. It's been around for a long time, with ancient civilizations practicing basic forms of medicine. Today, medicine is highly specialized, with different branches like internal medicine, surgery, pediatrics, and psychiatry. This paper aims to explore important concepts in medicine, recent advancements, and how healthcare professionals can improve patient outcomes.",
        segments: [
          {
            segment:
              "Medicine is a field that involves the study, diagnosis, and treatment of diseases and medical conditions.",
          },
          {
            segment:
              "It's been around for a long time, with ancient civilizations practicing basic forms of medicine.",
            corrections: {
              type: "Tone",
              suggestion:
                "Consider using more precise language to describe the historical development of medicine.",
              attempts: [
                {
                  text: "acknowledging the millennia-long history of medicine",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "recognizing the ancient origins of medical practice",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "highlighting the enduring presence of medicine throughout human history",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "describing the evolution of medical practices over centuries",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "acknowledging the long-standing tradition of medical knowledge across cultures",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "emphasizing the historical continuity of medical practices from antiquity to the present",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "contextualizing the historical background of medicine within different cultures and time periods",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
              ],
              score: -3,
            },
          },
          {
            segment:
              "Today, medicine is highly specialized, with different branches like internal medicine, surgery, pediatrics, and psychiatry.",
          },
          {
            segment:
              "This paper aims to explore important concepts in medicine, recent advancements, and how healthcare professionals can improve patient outcomes.",
            corrections: {
              type: "Clarity",
              suggestion:
                "Consider rephrasing to improve clarity and conciseness.",
              attempts: [
                {
                  text: "This paper aims to explore key medical concepts, recent advances, and methods for enhancing patient outcomes.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 1,
                  },
                },
                {
                  text: "The goal of this paper is to examine significant medical concepts, recent developments, and strategies for improving patient outcomes.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 1,
                  },
                },
                {
                  text: "The objective of this paper is to delve into crucial medical topics, recent progress, and strategies to enhance patient outcomes.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 1,
                  },
                },
                {
                  text: "This paper intends to explore essential medical principles, recent innovations, and approaches to enhancing patient care.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 1,
                  },
                },
                {
                  text: "The purpose of this paper is to investigate fundamental medical concepts, recent advancements, and strategies for optimizing patient care.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 1,
                  },
                },
                {
                  text: "This paper seeks to analyze core medical principles, recent breakthroughs, and approaches for optimizing patient well-being.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 1,
                  },
                },
                {
                  text: "The aim of this paper is to dissect fundamental medical concepts, recent breakthroughs, and strategies for optimizing patient health.",
                  settings: {
                    style: 1,
                    length: 2,
                    creativity: 1,
                  },
                },
              ],
              score: -2,
            },
          },
        ],
        answer:
          "The prompt provides a comprehensive overview of the field of medicine, covering its historical development, current specialization, and the objectives of the paper. However, there are areas where the language could be improved for precision and clarity, particularly in describing the historical aspects of medicine and the objectives of the paper.",
      },
    ],
  },
  {
    type: "document",
    title: "Medicine",
    prompts: [
      {
        title: "Introduction",
        prompt:
          "Medicine is a diverse field encompassing various disciplines, including clinical practice, research, and public health initiatives. Its history spans millennia, with ancient civilizations pioneering rudimentary medical practices to address ailments and improve health outcomes. Over time, medicine has evolved into a sophisticated and highly specialized field, with advancements in technology and scientific knowledge driving progress.",
        segments: [
          {
            segment:
              "Medicine is a diverse field encompassing various disciplines, including clinical practice, research, and public health initiatives.",
          },
          {
            segment:
              "Its history spans millennia, with ancient civilizations pioneering rudimentary medical practices to address ailments and improve health outcomes.",
            corrections: {
              type: "Tone",
              suggestion:
                "Consider using more respectful language to describe the historical significance of ancient medical practices.",
              attempts: [
                {
                  text: "Acknowledging the historical significance of ancient medical practices in laying the foundation for modern medicine.",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "Recognizing the pioneering efforts of ancient civilizations in early medical advancements.",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "Respecting the ingenuity of ancient medical practitioners in developing early healthcare solutions.",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
              ],
              score: -3,
            },
          },
          {
            segment:
              "Over time, medicine has evolved into a sophisticated and highly specialized field, with advancements in technology and scientific knowledge driving progress.",
          },
        ],
        answer:
          "The prompt provides a comprehensive overview of the evolution of medicine, highlighting its diverse disciplines and historical significance. However, there is a suggestion to use more respectful language when discussing ancient medical practices.",
      },
      {
        title: "State of the art",
        prompt:
          "In contemporary healthcare, medical professionals work collaboratively across interdisciplinary teams to provide holistic patient care. This collaborative approach integrates medical expertise with allied healthcare professionals, such as nurses, pharmacists, and therapists, to address the complex needs of patients. By leveraging the collective knowledge and skills of multidisciplinary teams, healthcare organizations strive to optimize patient outcomes and improve the quality of care.",
        segments: [
          {
            segment:
              "In contemporary healthcare, medical professionals work collaboratively across interdisciplinary teams to provide holistic patient care.",
          },
          {
            segment:
              "This collaborative approach integrates medical expertise with allied healthcare professionals, such as nurses, pharmacists, and therapists, to address the complex needs of patients.",
            corrections: {
              type: "Clarity",
              suggestion:
                "Consider rephrasing to enhance clarity and conciseness in describing the collaborative approach in healthcare.",
              attempts: [
                {
                  text: "This collaborative approach integrates medical expertise with allied healthcare professionals to address patient needs comprehensively.",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "By collaborating across interdisciplinary teams, medical professionals integrate diverse healthcare expertise to meet patient needs.",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
                {
                  text: "The collaborative model in healthcare integrates medical expertise with allied professionals to provide comprehensive patient care.",
                  settings: {
                    style: 1,
                    length: 1,
                    creativity: 1,
                  },
                },
              ],
              score: -2,
              appliedCorrection: 1,
            },
          },
          {
            segment:
              "By leveraging the collective knowledge and skills of multidisciplinary teams, healthcare organizations strive to optimize patient outcomes and improve the quality of care.",
          },
        ],
        answer:
          "The paragraph highlights the importance of interdisciplinary collaboration in contemporary healthcare, emphasizing the integration of medical expertise with allied healthcare professionals. However, there is a suggestion to rephrase for clarity and conciseness in describing the collaborative approach.",
      },
    ],
  },
];

function setChats(newchats) {
  chats = newchats;
}

let tutorialPhase = true;

function setTutorialPhase(value) {
  tutorialPhase = value;
}

function getTutorialPhase() {
  return tutorialPhase;
}

export { ai, chats, setChats, tutorialPhase, setTutorialPhase, getTutorialPhase };
