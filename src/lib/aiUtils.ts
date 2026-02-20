
export interface AIProcessingRequest {
    image: string; // base64
    mask?: string; // base64 for object removal
    prompt?: string; // for virtual staging
    mode: 'enhance' | 'remove_object' | 'virtual_stage';
}

export interface AIProcessingResponse {
    outputUrl: string;
    error?: string;
}

export const processWithAI = async (request: AIProcessingRequest): Promise<AIProcessingResponse> => {
    try {
        const response = await fetch('/api/enhance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('AI processing failed');
        }

        const data = await response.json();
        return { outputUrl: data.output };
    } catch (error) {
        console.error('AI Error:', error);
        return { outputUrl: '', error: (error as Error).message };
    }
};
