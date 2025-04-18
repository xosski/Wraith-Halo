
import uuid
import struct
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

def pad(data):
    while len(data) % 16 != 0:
        data += b'\x00'
    return data

def build_wraithkit(output="WRAITH_KIT.bin"):
    signature = b'WRA1THKIT' + uuid.uuid4().bytes[:8]
    seed = get_random_bytes(32)
    trigger_table = struct.pack("<IIII", 0x100, 0x200, 0x300, 0x400)
    
    payload = b"""
[WRAITHKIT_PAYLOAD]
- presence_override=True
- mnet_injection=True
- ghostcore_sync=True
- red_team_mask=True
- veil_xray_mode=True
- persistence_layer=emoji_encrypted
"""
    payload_padded = pad(payload)
    
    key = b'Sixteen byte key'
    cipher = AES.new(key, AES.MODE_CBC, iv=b'\x00'*16)
    encrypted_payload = cipher.encrypt(payload_padded)
    
    full_bin = signature + seed + trigger_table + encrypted_payload
    with open(output, 'wb') as f:
        f.write(full_bin)

    print(f"[⚙️] WRAITH_KIT.bin created: {output}")

build_wraithkit()
