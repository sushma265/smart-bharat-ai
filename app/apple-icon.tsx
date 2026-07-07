import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#E08A2E',
          borderRadius: 40,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '33.3%',
            left: 0,
            width: '100%',
            height: '33.3%',
            background: '#FFFFFF',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '66.6%',
            left: 0,
            width: '100%',
            height: '33.4%',
            background: '#2F8F5B',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 44,
            height: 44,
            marginTop: -22,
            marginLeft: -22,
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '7px solid #3D4F8F',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
