import os
from dotenv import load_dotenv
from anthropic import Anthropic

# LOAD ENV

load_dotenv()

# CREATE CLIENT

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

def generate_research_content(topic, report_type, pages):

    prompt = f"""
Generate a professional {report_type} research report on:

TOPIC: {topic}

Requirements:

- Minimum {pages} pages
- Professional formatting
- Clear headings
- Subheadings
- Bullet points
- Executive summary
- Introduction
- Main body
- Conclusion
- References
- Citations
- Case studies where relevant
- Proper paragraphs
- Academic tone

Return properly formatted clean content.
"""

    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4000,
        temperature=0.7,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.content[0].text