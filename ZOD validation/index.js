const express = require("express");
const { z } = require("zod");

const app = express();

app.use(express.json());



const instagramPostSchema = z
  .object({
    caption: z.string().max(2200).optional(),

    images: z
      .array(z.url())
      .min(1)
      .max(10),

    visibility: z.enum(["public", "followers", "private"]),

    location: z.string().max(100).optional(),

    tags: z
      .array(z.string().min(1).max(30))
      .max(30)
      .optional(),
  })
  .strict()
  .refine(
    (data) => data.caption !== undefined || data.images.length > 0,
    {
      message: "At least one of caption or images must be provided",
      path: ["caption"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.tags) {
      const uniqueTags = new Set(data.tags);

      if (uniqueTags.size !== data.tags.length) {
        ctx.addIssue({
          code: "custom",
          message: "Duplicate tags are not allowed",
          path: ["tags"],
        });
      }
    }
  });

app.post("/api/posts", (req, res) => {
  const validationData = instagramPostSchema.safeParse(req.body);

  if (validationData.success) {
    return res.status(201).json({
      success: true,
      data: validationData.data,
      message: "Post created successfully!",
    });
  }

  return res.status(422).json({
    success: false,
    errors: validationData.error.issues,
  });
});




const youtubeVideoSchema = z
  .object({
    title: z.string().min(5).max(100),

    description: z.string().max(5000).optional(),

    category: z.enum([
      "education",
      "gaming",
      "music",
      "entertainment",
      "technology",
    ]),

    visibility: z.enum(["public", "private", "unlisted"]),

    tags: z
      .array(z.string().min(2).max(30))
      .max(15)
      .optional(),

    ageRestriction: z.boolean().default(false),
  })
  .strict();

app.post("/api/videos", (req, res) => {
  const validationData = youtubeVideoSchema.safeParse(req.body);

  if (validationData.success) {
    return res.status(201).json({
      success: true,
      data: validationData.data,
      message: "Video uploaded successfully!",
    });
  }

  return res.status(422).json({
    success: false,
    errors: validationData.error.issues,
  });
});




const netflixPreferencesSchema = z
  .object({
    language: z.enum(["en", "hi", "es", "fr", "de", "ja"]).optional(),

    quality: z.enum(["auto", "low", "medium", "high"]).optional(),

    autoplay: z.boolean().optional(),

    subtitle: z.boolean().optional(),

    maturityLevel: z.enum(["kids", "teen", "adult"]).optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided",
    }
  );

app.patch("/api/users/preferences", (req, res) => {
  const validationData = netflixPreferencesSchema.safeParse(req.body);

  if (validationData.success) {
    return res.status(200).json({
      success: true,
      data: validationData.data,
      message: "User preferences updated successfully!",
    });
  }

  return res.status(422).json({
    success: false,
    errors: validationData.error.issues,
  });
});




const linkedinJobSchema = z
  .object({
    title: z.string().min(3).max(100),

    company: z.string().min(2).max(100),

    description: z.string().min(50).max(5000),

    location: z.string().min(2).max(100),

    workMode: z.enum(["remote", "hybrid", "onsite"]),

    employmentType: z.enum([
      "full-time",
      "part-time",
      "internship",
      "contract",
    ]),

    salary: z
      .object({
        min: z.number().positive(),
        max: z.number().positive(),
        currency: z.enum(["INR", "USD", "EUR"]),
      })
      .strict()
      .refine((data) => data.max >= data.min, {
        message: "Maximum salary cannot be less than minimum salary",
        path: ["max"],
      }),

    skills: z
      .array(z.string().min(2).max(50))
      .min(1)
      .max(20)
      .superRefine((skills, ctx) => {
        const uniqueSkills = new Set(skills);

        if (uniqueSkills.size !== skills.length) {
          ctx.addIssue({
            code: "custom",
            message: "Duplicate skills are not allowed",
            path: [],
          });
        }
      }),
  })
  .strict();

app.post("/api/jobs", (req, res) => {
  const validationData = linkedinJobSchema.safeParse(req.body);

  if (validationData.success) {
    return res.status(201).json({
      success: true,
      data: validationData.data,
      message: "Job posted successfully!",
    });
  }

  return res.status(422).json({
    success: false,
    errors: validationData.error.issues,
  });
});




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});