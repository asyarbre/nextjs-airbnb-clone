/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: [
      'gravatar.com',
      'a0.muscache.com',
      'avatar.vercel.sh',
      'djbwfrjvtnsghpuhpvpo.supabase.co',
    ],
  },
};

export default nextConfig;
