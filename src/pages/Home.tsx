// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { NeuralCard } from "@/components/ui/neural-card";
// import { FloatingElements, NeuralNetwork } from "@/components/ui/floating-elements";
// import { Cloud, Upload, Shield, Zap, Users, Star, Brain, Sparkles, Cpu } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: Cloud,
//       title: "Cloud Storage",
//       description: "Store your files securely in the cloud with unlimited access from anywhere."
//     },
//     {
//       icon: Upload,
//       title: "Easy Upload",
//       description: "Drag and drop your images, videos, and documents with our simple interface."
//     },
//     {
//       icon: Shield,
//       title: "Secure & Private",
//       description: "Your files are protected with enterprise-grade security and encryption."
//     },
//     {
//       icon: Zap,
//       title: "Lightning Fast",
//       description: "Upload and access your files instantly with our optimized cloud infrastructure."
//     },
//     {
//       icon: Users,
//       title: "Share & Collaborate",
//       description: "Share files with friends and colleagues or keep them private just for you."
//     },
//     {
//       icon: Star,
//       title: "Premium Experience",
//       description: "Enjoy a beautiful, intuitive interface designed for modern file management."
//     }
//   ];

//   return (
//     <div className="min-h-screen mesh-bg relative overflow-hidden">
//       <FloatingElements />
//       <NeuralNetwork />
      
//       {/* Header */}
//       <header className="relative z-10 border-b border-white/10 glass-card">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <Brain className="h-8 w-8 text-primary animate-neural-pulse" />
//               <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-glow" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//               CloudBase AI
//             </span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="quantum" onClick={() => navigate("/login")}>
//               Login
//             </Button>
//             <Button variant="neural" onClick={() => navigate("/signup")}>
//               Sign Up
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative py-20 px-4 overflow-hidden">
//         <div className="container mx-auto text-center relative z-10">
//           <div className="relative mb-12">
//             <div className="absolute inset-0 animate-morph bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"></div>
//             <div className="relative animate-float">
//               <div className="relative inline-block">
//                 <Brain className="h-32 w-32 text-primary mx-auto mb-6 animate-neural-pulse" />
//                 <Cpu className="absolute top-2 right-2 h-8 w-8 text-accent animate-glow" />
//                 <Sparkles className="absolute bottom-2 left-2 h-6 w-6 text-secondary animate-float" />
//               </div>
//             </div>
//           </div>
          
//           <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
//             <span className="text-foreground">AI-Powered</span>
//             <br />
//             <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
//               Cloud Intelligence
//             </span>
//           </h1>
          
//           <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
//             Experience the next generation of cloud storage with AI-powered organization, 
//             intelligent search, and neural network-enhanced file management. 
//             Your files, supercharged by artificial intelligence.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button 
//               variant="hero" 
//               size="hero" 
//               onClick={() => navigate("/signup")}
//               className="group"
//             >
//               <Sparkles className="mr-2 h-5 w-5 group-hover:animate-glow" />
//               Start Your AI Journey
//             </Button>
//             <Button 
//               variant="morphic" 
//               size="hero" 
//               onClick={() => navigate("/login")}
//             >
//               <Brain className="mr-2 h-5 w-5" />
//               Explore Demo
//             </Button>
//           </div>
//         </div>
        
//         {/* Background decorative elements */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
//       </section>

//       {/* Features Section */}
//       <section className="relative py-20 px-4">
//         <div className="container mx-auto relative z-10">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               <span className="text-foreground">Why Choose </span>
//               <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//                 CloudBase AI?
//               </span>
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Cutting-edge AI technology meets intuitive design for the ultimate cloud experience
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <NeuralCard 
//                 key={index} 
//                 variant={index % 4 === 0 ? "neural" : index % 4 === 1 ? "morphic" : index % 4 === 2 ? "quantum" : "glass"}
//                 animated={index < 3}
//                 className="p-8 group hover:scale-105 cursor-pointer"
//               >
//                 <div className="relative">
//                   <feature.icon className="h-14 w-14 text-primary mb-6 group-hover:animate-neural-pulse transition-all duration-300" />
//                   <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
//                     {feature.title}
//                   </h3>
//                   <p className="text-muted-foreground leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               </NeuralCard>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative py-24 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
//         <NeuralNetwork className="opacity-20" />
        
//         <div className="container mx-auto text-center relative z-10">
//           <NeuralCard variant="glass" className="p-12 max-w-4xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold mb-8">
//               <span className="text-foreground">Ready to Experience</span>
//               <br />
//               <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
//                 AI-Powered Cloud?
//               </span>
//             </h2>
            
//             <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
//               Join the future of cloud storage. Let artificial intelligence transform 
//               how you organize, search, and interact with your digital world.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button 
//                 variant="hero" 
//                 size="hero" 
//                 onClick={() => navigate("/signup")}
//                 className="group"
//               >
//                 <Brain className="mr-2 h-5 w-5 group-hover:animate-neural-pulse" />
//                 Start Free with AI
//               </Button>
//               <Button 
//                 variant="quantum" 
//                 size="hero" 
//                 onClick={() => navigate("/login")}
//               >
//                 <Cpu className="mr-2 h-5 w-5" />
//                 View Live Demo
//               </Button>
//             </div>
//           </NeuralCard>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative border-t border-white/10 glass-card py-12 px-4">
//         <div className="container mx-auto text-center">
//           <div className="flex items-center justify-center space-x-3 mb-6">
//             <div className="relative">
//               <Brain className="h-8 w-8 text-primary animate-neural-pulse" />
//               <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-glow" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//               CloudBase AI
//             </span>
//           </div>
//           <p className="text-muted-foreground text-lg">
//             © 2024 CloudBase AI. Powered by neural networks, designed for humans.
//           </p>
//             <div className="mt-4 text-lg text-muted-foreground/70">
//             Experience the future of intelligent cloud storage
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cloud, Upload, Shield, Zap, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Store your files securely in the cloud with unlimited access from anywhere."
    },
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Drag and drop your images, videos, and documents with our simple interface."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your files are protected with enterprise-grade security and encryption."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Upload and access your files instantly with our optimized cloud infrastructure."
    },
    {
      icon: Users,
      title: "Share & Collaborate",
      description: "Share files with friends and colleagues or keep them private just for you."
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Enjoy a beautiful, intuitive interface designed for modern file management."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">CloudBase</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-float mb-8">
            <Cloud className="h-24 w-24 text-primary mx-auto mb-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Your Personal
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}Cloud Storage
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Store, organize, and access your images, videos, and notes from anywhere. 
            Experience the future of cloud storage with our beautiful and secure platform.
          </p>
          <Button 
            variant="hero" 
            size="hero" 
            onClick={() => navigate("/signup")}
            className="animate-glow"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Choose CloudBase?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-[var(--shadow-cloud)] transition-all duration-300 border border-border/50">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who trust CloudBase for their file storage needs.
          </p>
          <Button 
            variant="hero" 
            size="hero" 
            onClick={() => navigate("/signup")}
          >
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">CloudBase</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 CloudBase. Your files, your cloud, your way.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;