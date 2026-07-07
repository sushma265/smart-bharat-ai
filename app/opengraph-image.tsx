import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: '#FBF7F0',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 14,
            background: '#E08A2E',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 14,
            background: '#2F8F5B',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: '#E08A2E',
              display: 'flex',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
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
                width: 20,
                height: 20,
                marginTop: -10,
                marginLeft: -10,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '4px solid #3D4F8F',
                display: 'flex',
              }}
            />
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, color: '#2B2B2B', display: 'flex' }}>
            Smart Bharat AI
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#2B2B2B',
            lineHeight: 1.15,
            maxWidth: 900,
            display: 'flex',
          }}
        >
          Government services, finally explained in your language.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: '#6B6B6B',
            display: 'flex',
          }}
        >
          English · हिन्दी · తెలుగు
        </div>
      </div>
    ),
    { ...size },
  )
}
