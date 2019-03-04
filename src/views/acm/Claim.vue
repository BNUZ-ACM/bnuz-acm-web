<template>
    <Content :style="{padding: '0 200px'}">
        <h1 class="big-title">
            竞赛要求
        </h1>
        <Divider/>
        <h1>编程要求</h1>
        <Card style="width:100%; margin-top: 10px;">
            <Row>
                <Col span="18" style="height: 100%;">
                    ACM允许选手使用三种编程语言进行解题，同时每道题都有时间和内存消耗的限制。
                    <br>
                    选手需要让自己的程序在规定时间和内存范围内，按格式正确输入和输出后台测试样例中的所有数据。此时评判系统返回Yes（平常练习是OJ通常返回Accepted），解题成功。否则视为解题错误。
                    <br>
                </Col>
                <Col span="6">
                    <img src="../../assets/submit.png" width="100%"/>
                </Col>
            </Row>
        </Card>
        <br>
        <h1>语言要求</h1>
        <Card style="width:100%; margin-top: 10px;">
             ACM亚洲区允许使用三种编程语言：C、C++和Java。常使用GNU GCC/G++作为C/C++编译器，使用sun-java-jdk编译Java，选手可在赛前查询到具体的编译器版本。赛场内通常提供搭载Linux系统的电脑和CodeBlocks编译器，使用PC Square作为评判系统。
        </Card>
        <br>
        <h1>格式要求</h1>
        <Card style="width:100%; margin-top: 10px;">
            ACM及其重视格式，程序应该从标准输入stdin('Standard Input')获取输出，并将结果输出到标准输出stdout('Standard Output')。例如，在C语言可以使用“scanf”、在C++可以使用“cin”进行输入，在C使用“printf”、在C++使用“cout”进行输出。做题时应认真读题，严格按照题目要求输入、输出。输出格式错误评判系统将判错并返回“Presentation Error”，输入格式错误则可能直接导致程序运行出错。
        </Card>
        <br>
        <h1>代码样例</h1>
        <h2>下面是HDU1000题目的标准代码：</h2>
        <Card style="width:100%; margin-top: 10px;">

        <h3>C语言</h3>
            <div v-highlight>
                <pre><code class="c">#include &ltstdio.h&gt
int main(){
    int a,b;
    while(scanf("%d %d",&a, &b) != EOF){
        printf("%d\n",a+b);
    }
    return 0;
}</code></pre>
            </div>
            <h3>C++</h3>
            <div v-highlight>
                <pre><code class="c++">#include &ltiostream&gt
using namespace std;
int main(){
    int a,b;
    while(cin >> a >> b){
        cout &lt&lt a+b &lt&lt endl;
    }
    return 0;
}</code></pre>
            </div>
            <h3>Java</h3>
            <div v-highlight>
                <pre><code class="java">import java.util.Scanner;
public class Main {
	public static void main(String[] args){
		Scanner scan = new Scanner(System.in);
		while(scan.hasNext()){
			int a = scan.nextInt();
			int b = scan.nextInt();
			System.out.println(String.format("%d", a + b));
		}
	}
}</code></pre>
            </div>
        </Card>
        <br>
        <h1>评判系统返回提示语</h1>
        <Card style="width:100%; margin-top: 10px;">
            每次代码提交后，评判系统将进行实时实时评判，并返回结果。常见的返回提示如下：
            <br>
            Pending：你的答案在排队等待编译；
            <br>
            Pending Rejudge：因为数据更新或其他原因，系统将重新判你的答案；
            <br>
            Compiling：正在编译；
            <br>
            Running & Judging：正在运行和判断；
            <br>
            Yes（平常练习时OJ通常返回Accepted）：程序通过；
            <br>
            Presentation Error：答案基本正确，但是格式不对；
            <br>
            Wrong Answer：答案不对，仅仅通过样例数据的测试并不一定是正确答案，一定还有你没想到的地方；
            <br>
            Time Limit Exceeded：运行超出时间限制，检查下是否有死循环，或者应该有更快的计算方法；
            <br>
            Memory Limit Exceeded：超出内存限制，数据可能需要压缩，检查内存是否有泄露；
            <br>
            Output Limit Exceeded：输出超过限制，你的输出比正确答案长了两倍以上；
            <br>
            Runtime Error：运行时错误，包括非法的内存访问，数组越界，指针漂移，调用禁用的系统函数；
            <br>
            Compile Error：编译错误，点击后可获得编译器的详细输出。    
        </Card>
    </Content>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
    
})
</script>
