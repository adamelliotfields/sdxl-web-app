import axios from 'redaxios'

const { VITE_HF_TOKEN } = import.meta.env

export interface HuggingFaceConfig {
  model: string
  prompt: string
  height: number
  width: number
  negative_prompt: string
  guidance_scale: number
  num_inference_steps: number
}

export default async function huggingface({
  model,
  prompt,
  height,
  width,
  negative_prompt,
  guidance_scale,
  num_inference_steps
}: HuggingFaceConfig) {
  const url = `https://api-inference.huggingface.co/models/${model}`

  return axios.post(
    url,
    {
      inputs: prompt,
      parameters: {
        height,
        width,
        negative_prompt,
        guidance_scale,
        num_inference_steps
      }
    },
    {
      responseType: 'blob',
      headers: {
        Authorization: VITE_HF_TOKEN
          ? `Bearer ${VITE_HF_TOKEN}`
          : (undefined as unknown as string),
        'Content-Type': 'application/json',
        'X-Use-Cache': 'false',
        'X-Wait-For-Model': 'true'
      }
    }
  )
}
