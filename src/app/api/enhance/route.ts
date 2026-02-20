
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
    try {
        const { image, mask, prompt, mode } = await req.json();

        if (!process.env.REPLICATE_API_TOKEN) {
            // Fallback for demo purposes if no token is provided
            console.warn('REPLICATE_API_TOKEN is not set. Returning original image as fallback.');
            return NextResponse.json({ output: image });
        }

        let output;

        if (mode === 'enhance') {
            // Using CodeFormer for enhancement
            output = await replicate.run(
                "sczhou/codeformer:7de2ea4a3562fdabc24119151ffc2b74070ad449570b02f0f491c140411a6872",
                {
                    input: {
                        image: image,
                        upscale: 2,
                        face_upsample: true,
                        background_enhance: true,
                        codeformer_fidelity: 0.7
                    }
                }
            );
        } else if (mode === 'remove_object') {
            // Using SDXL Inpainting for object removal
            output = await replicate.run(
                "stability-ai/sdxl-inpainting:9530467382d3345155f3069c991f80735ed4bf33b5c879ed8c7151a6659c08d1",
                {
                    input: {
                        image: image,
                        mask: mask,
                        prompt: "clean room, high quality, professional photography, background matches perfectly",
                        negative_prompt: "deformed, ugly, blurry, watermarks"
                    }
                }
            );
        } else if (mode === 'virtual_stage') {
            // Using SDXL with room staging prompt
            output = await replicate.run(
                "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7afea27d1c095c0680a939100361e",
                {
                    input: {
                        image: image,
                        prompt: prompt || "professionally staged living room, modern furniture, high-end interior design",
                        refine: "expert_ensemble_refiner",
                        apply_watermark: false
                    }
                }
            );
        }

        return NextResponse.json({ output: Array.isArray(output) ? output[0] : output });
    } catch (error) {
        console.error('Replicate Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
